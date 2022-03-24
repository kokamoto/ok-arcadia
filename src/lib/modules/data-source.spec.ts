import {
  ArrayDataSource,
  DataQuery,
  DataSourceManager,
  generateDataSourceManager
} from "./data-source";

type Donut = {
  name: string;
  type: string;
  price: number;
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
    });
  });

  test('should be able to add alphabetical sort by to fetch', (done) => {
    const query: DataQuery = {
      sortBy: { field: 'name', dir: 'asc'}
    };
    source.fetchData(query).subscribe((data: Donut[]) => {
      expect(data[0].name).toBe('Birthday Party');
      done();
    });
  });

  test('should be able to add numerical sort by to fetch', (done) => {
    const query: DataQuery = {
      sortBy: { field: 'price', dir: 'asc'}
    };
    source.fetchData(query).subscribe((data: Donut[]) => {
      expect(data[0].name).toBe('Coffee Companion');
      done();
    });
  });

  test('should be able to add alphabetical sort in descendig order to fetch', (done) => {
    const query: DataQuery = {
      sortBy: { field: 'name', dir: 'desc'}
    };
    source.fetchData(query).subscribe((data: Donut[]) => {
      expect(data[0].name).toBe('Super Donut');
      done();
    });
  });

});

test('should generate store manager', () => {
  const manager:DataSourceManager<Donut> = generateDataSourceManager<Donut>();
  
});

const DONUTS: Donut[] = [{
  name: 'Original',
  price: 0.70,
  type: 'raised',
  weight: 70,
  glaze: 'plain',
  hasSprinkles: false
}, {
  name: 'Coffee Companion',
  price: 0.50,
  type: 'cake',
  weight: 85,
  glaze: 'none',
  hasSprinkles: false
}, {
  name: 'Good Old Chocolate',
  type: 'raised',
  price: 0.70,
  weight: 75,
  glaze: 'chocolate',
  hasSprinkles: false
}, {
  name: 'Birthday Party',
  type: 'cake',
  price: 0.60,
  weight: 90,
  glaze: 'vanilla',
  hasSprinkles: true
}, {
  name: 'Chocolate Party',
  type: 'cake',
  price: 0.60,
  weight: 90,
  glaze: 'chocolate',
  hasSprinkles: true
}, {
  name: 'Super Donut',
  type: 'raised',
  price: 1.00,
  weight: 120,
  glaze: 'chocolate',
  hasSprinkles: true
}, {
  name: 'Maple Marvel',
  type: 'raised',
  price: 0.70,
  weight: 75,
  glaze: 'maple',
  hasSprinkles: false
}];