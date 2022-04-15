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

export type DataSourceManagerParams<T> = {
  source: DataSource<T>,
  query?: DataQuery
}

export class DataSourceManager<T> {
  apiData: Writable<T[]>;
  source: DataSource<T>;
  savedQuery: DataQuery = {};

  constructor(params: DataSourceManagerParams<T>) {
    this.apiData = writable([]);
    this.source = params.source;
    if (params.query) {
      this.savedQuery = params.query;
    }
  };

  /**
   * Initiate fetch from data source using current query state.
   */
  fetch(query?: DataQuery): void {
    query = query || this.savedQuery;
    this.source.fetchData(query).subscribe((data:T[]) => {
      this.apiData.set(data);
    });
  }

  getStore(): Readable<T[]> {
    return derived(this.apiData, ($apiData) => {
      return $apiData as T[];
    });
  }
}
