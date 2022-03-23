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

export type DataSourceState = {
  keyword: string;
  sortBy: Sort[];
  filterBy: Filter[];
}; 

export abstract class DataSource<T> {
  state: DataSourceState;
  abstract fetchData(): void;
}

export class ArrayDataSource<T> extends DataSource<T> {
  data: T[];

  constructor(data: T[]) {
    super();
    this.data = data;
  }

  fetchData(): Observable<T[]> {
    return of(this.data);
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