import { writable, derived } from "svelte/store"
import type { Readable, Writable } from "svelte/store";
import { Observable, of } from "rxjs";

export type Sort = {
  field: string;
  dir: 'asc' | 'desc';
}

export type SimpleFilter = {
  field: string;
  value: string;
}

export type Filter = SimpleFilter;

export type DataQuery = {
  keyword?: string;
  sortBy?: Sort;
};

export type DataSourceState = {
  keyword: string;
  sortBy: Sort;
  filterBy: Filter[];
};

export abstract class DataSource<T> {
  state: DataSourceState;
  abstract fetchData(query?: DataQuery): void;
}

export class ArrayDataSource<T> extends DataSource<T> {
  data: T[];

  constructor(data: T[]) {
    super();
    this.data = data;
  }

  fetchData(query?: DataQuery): Observable<T[]> {
    let data = this.data;
    if (query && query.sortBy) {
      data = this._sort(data, query);
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
}

export class DataSourceManager<T> {
  apiData: Writable<T[]>;

  constructor() {
    this.apiData = writable([]);
  };

  fetch(): void {

  };

  getStore(): Readable<T[]> {
    return derived(this.apiData, ($apiData) => {
      return $apiData as T[];
    });
  }
}


export function generateDataSourceManager<T>(): DataSourceManager<T> {
  return new DataSourceManager<T>();
}