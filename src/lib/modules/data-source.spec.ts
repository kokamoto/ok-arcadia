import {
  DataSource,
  DataSourceManager,
  generateDataSourceManager
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
    const manager:DataSourceManager<Donut> = new DataSourceManager<Donut>(source);
    const store: Readable<Donut[]> = manager.getStore();
    manager.fetch();
    store.subscribe(data => {
      expect(data.length).toBe(DONUTS.length);
      done();
    });
  });

});
