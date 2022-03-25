import { Observable, of } from "rxjs";
import { DataQuery, DataSource, Filter } from "./data-source";

export class ArrayDataSource<T> extends DataSource<T> {
  data: T[];

  constructor(data: T[]) {
    super();
    this.data = data;
  }

  fetchData(query?: DataQuery): Observable<T[]> {
    let data = this.data.slice();
    if (!query) {
      return of(data);
    }
    if (query.filterBy) {
      data = this._filter(data, query);
    }
    if (query.sortBy) {
      data = this._sort(data, query);
    }
    if (query.top || query.skip) {
      data = this._page(data, query);
    }
    return of(data);
  }

  _sort(data: T[], query: DataQuery): T[] {
    if (query.sortBy) {
      const field: string = query.sortBy.field;
      const dir: number = (query.sortBy.dir === 'desc') ? -1 : 1;
      return data.sort((a: T, b: T) => {
        if (a[field] < b[field]) {
          return -1 * dir;
        }
        if (a[field] > b[field]) {
          return 1 * dir;
        }
        return 0;
      });
    }
    return data;
  }

  _filter(data: T[], query: DataQuery): T[] {
    if (query.filterBy) {
      const filter = query.filterBy[0];
      const match = this._getFilterFunction(filter);
      return data.filter(match);
    }
    return data;
  }

  _getFilterFunction(filter: Filter): (record: T) => boolean {
    if (filter.match === 'exact') {
      return function(record:T) {
        return record[filter.field] === filter.value;
      }
    }
    return function(record:T) {
      return record[filter.field].indexOf(filter.value) > -1;
    }
  }

  _page(data: T[], query: DataQuery): T[] {
    if (query.top || query.skip) {
      const start = query.skip || 0;
      const end = (query.top) ? start + query.top : data.length;
      return data.slice(start, end);
    }
    return data;
  }
}
