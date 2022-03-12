import { writable, derived } from "svelte/store"
import type { Readable, Writable } from "svelte/store";

export type CompetitorRank = {
  division: string;
  belt: string;
  name: string;
  gender: string;
  totalpoints: number;
}

export class DataSourceManager<T> {
  apiData: Writable<T[]>;

  constructor() {
    this.apiData = writable([]);
  };

  fetch(): void {
    fetch('/data/test_recognized.json')
      .then(response => response.json())
      .then(data => {
        this.apiData.set(data as T[]);
      }).catch(error => {
        console.log(error);
        return [];
      })
  };

  getStore(): Readable<T[]> {
    return derived(this.apiData, ($apiData) => {
      return $apiData as T[];
    });
  }
}

export function generateStoreManager(opt) {
  
}
