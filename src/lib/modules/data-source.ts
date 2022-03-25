import { writable, derived } from "svelte/store"
import type { Readable, Writable } from "svelte/store";

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
  top?: number;
  skip?: number;
};

export type DataSourceState = {
  keyword: string;
  sortBy: Sort;
  filterBy: Filter[];
};

export abstract class DataSource<T> {
  abstract fetchData(query?: DataQuery): void;
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