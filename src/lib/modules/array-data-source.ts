import { Observable, of } from "rxjs";
import { DataQuery, DataSource } from "./data-source";

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
    if (query.sortBy) {
      data = this._sort(data, query);
    }
    if (query.top || query.skip) {
      const start = query.skip || 0;
      const end = (query.top) ? start + query.top : data.length;
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

  _page(data: T[], query: DataQuery): T[] {
    if (query.top || query.skip) {
      const start = query.skip || 0;
      const end = (query.top) ? start + query.top : data.length;
      return data.slice(start, end);
    }
    return data;
  }
}
