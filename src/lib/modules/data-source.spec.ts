import {
  ArrayDataSource,
  DataSourceManager,
  generateDataSourceManager
} from "./data-source";

type Donut = {
  name: string;
  type: string;
  weight: number;
  glaze: string;
  hasSprinkles: boolean;
};

describe('ArrayDataSource', () => {
  let source: ArrayDataSource<Donut>;

  beforeAll(() => {
    source = new ArrayDataSource<Donut>(DONUTS);
  });

  test('should be able to fetch entire array by default', (done) => {
    source.fetchData().subscribe((data: Donut[]) => {
      expect(data.length).toBe(DONUTS.length);
      done();
    })
  });

});

test('should generate store manager', () => {
  const manager:DataSourceManager<Donut> = generateDataSourceManager<Donut>();
  
});

const DONUTS: Donut[] = [{
  name: 'The Original',
  type: 'raised',
  weight: 70,
  glaze: 'plain',
  hasSprinkles: false
}, {
  name: 'The Coffee Companion',
  type: 'cake',
  weight: 85,
  glaze: 'none',
  hasSprinkles: false
}, {
  name: 'Good Old Chocolate',
  type: 'raised',
  weight: 75,
  glaze: 'chocolate',
  hasSprinkles: false
}, {
  name: 'Birthday Party',
  type: 'cake',
  weight: 90,
  glaze: 'vanilla',
  hasSprinkles: true
}];