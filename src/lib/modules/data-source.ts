import { writable, derived } from "svelte/store"
import type { Readable, Writable } from "svelte/store";
import type { Observable } from "rxjs";

export type Sort = {
  field: string;
  dir: 'asc' | 'desc';
};

export type StringFilter = {
  type: 'string';
  field: string;
  value: string;
  match: 'exact' | 'contains'
};

export type NumberFilter = {
  type: 'number';
  field: string;
  value: number;
  match: 'eq' | 'lt' | 'le' | 'gt' | 'ge' | 'ne';
};

export type Filter = StringFilter | NumberFilter;

export type DataQuery = {
  keyword?: string;
  sortBy?: Sort;
  filterBy?: Filter[],
  top?: number;
  skip?: number;
};


export abstract class DataSource<T> {
  abstract fetchData(query?: DataQuery): Observable<T[]>;
}

export class DataSourceManager<T> {
  apiData: Writable<T[]>;

  constructor() {
    this.apiData = writable([]);
  };

  /**
   * Initiate fetch from data source using current query state.
   */
  fetch(): void {

  }

  /**
   * Set query state and trigger new fetch of data.
   * @param query 
   */
  setQuery(query: DataQuery): void {

  }

  getStore(): Readable<T[]> {
    return derived(this.apiData, ($apiData) => {
      return $apiData as T[];
    });
  }
}


export function generateDataSourceManager<T>(): DataSourceManager<T> {
  return new DataSourceManager<T>();
}