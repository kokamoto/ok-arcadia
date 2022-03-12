import { DataSourceManager, generateDataSourceManager } from "./data-source";

type Donut = {
  name: string;
  size: string;
  weight: number;
  hasSprinkles: boolean;
};

test('should generate store manager', () => {
  const manager:DataSourceManager<Donut> = generateDataSourceManager<Donut>();
  
});