import {
  DataSourceManager,
  generateDataSourceManager
} from "./data-source";
import type { Donut } from "./array-data-source.spec";

test('should generate store manager', () => {
  const manager:DataSourceManager<Donut> = generateDataSourceManager<Donut>();  
});
