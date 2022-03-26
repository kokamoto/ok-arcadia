import { Observable, of } from "rxjs";
import { DataQuery, DataSource, Filter, NumberFilter, StringFilter } from "./data-source";

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

  _filter(data: T[], query: DataQuery): T[] {
    const match = this._composeFilterFunction(query.filterBy);
    return data.filter(match);
  }

  _composeFilterFunction(filters: Filter[]): (record: T) => boolean {
    const filter = filters.pop();
    const filterFuncA = this._getFilterFunction(filter);
    if (filters.length === 0) {
      return filterFuncA;
    }
    const filterFuncB = this._composeFilterFunction(filters);
    return  function(record: T): boolean {
      return filterFuncA(record) && filterFuncB(record);
    }
  }

  _getFilterFunction(filter: Filter): (record: T) => boolean {
    if (filter.type === 'number') {
      return this._getNumberFilterFunction(filter);
    } else if (filter.type === 'string') {
      return this._getStringFilterFunction(filter);
    } else {
      return function(record: T): boolean {
        return true;
      }
    }
  }

  _getStringFilterFunction(filter: StringFilter): (record: T) => boolean {
    if (filter.match === 'exact') {
      return function(record:T): boolean {
        return record[filter.field] === filter.value;
      }
    }
    return function(record:T): boolean {
      return record[filter.field].indexOf(filter.value) > -1;
    }
  }

  _getNumberFilterFunction(filter: NumberFilter): (record: T) => boolean {
    if (filter.match === 'lt') {
      return function(record: T): boolean {
        return record[filter.field] < filter.value;
      }
    } else if (filter.match === 'le') {
      return function(record: T): boolean {
        return record[filter.field] <= filter.value;
      }
    } else if (filter.match === 'gt') {
      return function(record: T): boolean {
        return record[filter.field] > filter.value;
      }
    } else if (filter.match === 'ge') {
      return function(record: T): boolean {
        return record[filter.field] >= filter.value;
      }
    } else if (filter.match === 'ne') {
      return function(record: T): boolean {
        return record[filter.field] !== filter.value;
      }
    } else {
      return function(record: T):boolean {
        return record[filter.field] === filter.value;
      }
    }
  }

  _page(data: T[], query: DataQuery): T[] {
    const start = query.skip || 0;
    const end = (query.top) ? start + query.top : data.length;
    return data.slice(start, end);
  }
}
