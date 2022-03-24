import {
  ArrayDataSource,
  DataQuery,
  DataSourceManager,
  generateDataSourceManager
} from "./data-source";

type Donut = {
  id: string;
  name: string;
  type: string;
  price: number;
  weight: number;
  glaze: string;
  hasSprinkles: boolean;
};

describe('ArrayDataSource', () => {
  let source: ArrayDataSource<Donut>;

  beforeEach(() => {
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

  test('should be able to add alphabetical sort in descending order to fetch', (done) => {
    const query: DataQuery = {
      sortBy: { field: 'name', dir: 'desc'}
    };
    source.fetchData(query).subscribe((data: Donut[]) => {
      expect(data[0].name).toBe('Super Donut');
      done();
    });
  });

  test('should be able to set number of records returned', (done) => {
    const top = 3;
    const query: DataQuery = {
      top: top
    };
    source.fetchData(query).subscribe((data: Donut[]) => {
      expect(data.length).toBe(top);
      expect(data[0].id).toBe('001');
      done();
    });
  });

  test('should be able to set starting index of records returned', (done) => {
    const skip = 3;
    const query: DataQuery = {
      skip: skip
    };
    source.fetchData(query).subscribe((data: Donut[]) => {
      expect(data.length).toBe(DONUTS.length - skip);
      expect(data[0].id).toBe('004');
      done();
    });
  });

  test('should be able to set page (top & skip) of records returned', (done) => {
    const skip = 4;
    const top = 2
    const query: DataQuery = {
      top: top,
      skip: skip
    };
    source.fetchData(query).subscribe((data: Donut[]) => {
      expect(data.length).toBe(top);
      expect(data[0].id).toBe('005');
      done();
    });
  });
});

test('should generate store manager', () => {
  const manager:DataSourceManager<Donut> = generateDataSourceManager<Donut>();
  
});

const DONUTS: Donut[] = [{
  id: '001',
  name: 'Original',
  price: 0.70,
  type: 'raised',
  weight: 70,
  glaze: 'plain',
  hasSprinkles: false
}, {
  id: '002',
  name: 'Coffee Companion',
  price: 0.50,
  type: 'cake',
  weight: 85,
  glaze: 'none',
  hasSprinkles: false
}, {
  id: '003',
  name: 'Good Old Chocolate',
  type: 'raised',
  price: 0.70,
  weight: 75,
  glaze: 'chocolate',
  hasSprinkles: false
}, {
  id: '004',
  name: 'Birthday Party',
  type: 'cake',
  price: 0.60,
  weight: 90,
  glaze: 'vanilla',
  hasSprinkles: true
}, {
  id: '005',
  name: 'Chocolate Party',
  type: 'cake',
  price: 0.60,
  weight: 90,
  glaze: 'chocolate',
  hasSprinkles: true
}, {
  id: '006',
  name: 'Super Donut',
  type: 'raised',
  price: 1.00,
  weight: 120,
  glaze: 'chocolate',
  hasSprinkles: true
}, {
  id: '007',
  name: 'Maple Marvel',
  type: 'raised',
  price: 0.70,
  weight: 75,
  glaze: 'maple',
  hasSprinkles: false
}];