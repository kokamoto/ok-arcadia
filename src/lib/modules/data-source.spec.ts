import {
  DataQuery,
  DataSource,
  DataSourceManager
} from "./data-source";
import { Donut, DONUTS } from "./array-data-source.spec";
import { ArrayDataSource } from "./array-data-source";
import type { Readable } from "svelte/store";

describe('DataSourceManager', () => {
  let source: DataSource<Donut>;

  beforeEach(() => {
    source = new ArrayDataSource<Donut>(DONUTS);
  });

  test('should be able to fetch all records from a DataSource', (done) => {
    const manager:DataSourceManager<Donut> = new DataSourceManager<Donut>({
      source
    });
    const store: Readable<Donut[]> = manager.getStore();
    manager.fetch();
    store.subscribe(data => {
      expect(data.length).toBe(DONUTS.length);
      done();
    });
  });

  test('should be able to fetch records from a DataSource using DataQuery', (done) => {
    const manager:DataSourceManager<Donut> = new DataSourceManager<Donut>({
      source
    });
    const store: Readable<Donut[]> = manager.getStore();
    const query: DataQuery = {
      top: 5
    }
    manager.fetch(query);
    store.subscribe(data => {
      expect(data.length).toBe(5);
      done();
    });
  });

  test('should be able to initialize with default query', (done) => {
    const query: DataQuery = {
      top: 5
    }
    const manager:DataSourceManager<Donut> = new DataSourceManager<Donut>({
      source,
      query
    });
    const store: Readable<Donut[]> = manager.getStore();
    manager.fetch();
    store.subscribe(data => {
      expect(data.length).toBe(5);
      done();
    });

  });

});
