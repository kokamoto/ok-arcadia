import { ArrayDataSource } from "./array-data-source";
import type { DataQuery } from "./data-source";

export type Donut = {
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
      expect(data[0].name).toBe('Apple Fritter');
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

  test('should be able to filter records by "exact" match of string', (done) => {
    const query: DataQuery = {
      filterBy: [{
        type: 'string',
        field: 'name',
        value: 'Good Old Chocolate',
        match: 'exact'
      }]
    };
    source.fetchData(query).subscribe((data: Donut[]) => {
      expect(data.length).toBe(1);
      expect(data[0].name).toBe('Good Old Chocolate');
      done();
    });
  });
  
  test('should be able to filter records by "contains" match of string', (done) => {
    const query: DataQuery = {
      filterBy: [{
        type: 'string',
        field: 'name',
        value: 'Chocolate',
        match: 'contains'
      }]
    };
    source.fetchData(query).subscribe((data: Donut[]) => {
      expect(data.length).toBe(3);
      expect(data[0].name).toBe('Good Old Chocolate');
      expect(data[1].name).toBe('Chocolate Party');
      expect(data[2].name).toBe('Big Chocolate Party');
      done();
    });
  });

  test('should be able to filter records by "eq" match of number', (done) => {
    const query: DataQuery = {
      filterBy: [{
        type: 'number',
        field: 'weight',
        value: 85,
        match: 'eq'
      }]
    };
    source.fetchData(query).subscribe((data: Donut[]) => {
      expect(data.length).toBe(1);
      expect(data[0].weight).toBe(85);
      done();
    });
  });

  test('should be able to filter records by "lt" match of number', (done) => {
    const query: DataQuery = {
      filterBy: [{
        type: 'number',
        field: 'price',
        value: 0.70,
        match: 'lt'
      }]
    };
    source.fetchData(query).subscribe((data: Donut[]) => {
      expect(data.length).toBe(3);
      data.forEach(record => {
        expect(record.price < 0.70).toBeTruthy();
      })
      done();
    });
  });

  test('should be able to filter records by "le" match of number', (done) => {
    const query: DataQuery = {
      filterBy: [{
        type: 'number',
        field: 'price',
        value: 0.70,
        match: 'le'
      }]
    };
    source.fetchData(query).subscribe((data: Donut[]) => {
      expect(data.length).toBe(6);
      data.forEach(record => {
        expect(record.price <= 0.70).toBeTruthy();
      });
      done();
    });
  });

  test('should be able to filter records by "gt" match of number', (done) => {
    const query: DataQuery = {
      filterBy: [{
        type: 'number',
        field: 'price',
        value: 1.00,
        match: 'gt'
      }]
    };
    source.fetchData(query).subscribe((data: Donut[]) => {
      expect(data.length).toBe(1);
      data.forEach(record => {
        expect(record.price > 1.00).toBeTruthy();
      });
      done();
    });
  });

  test('should be able to filter records by "ge" match of number', (done) => {
    const query: DataQuery = {
      filterBy: [{
        type: 'number',
        field: 'price',
        value: 1.00,
        match: 'ge'
      }]
    };
    source.fetchData(query).subscribe((data: Donut[]) => {
      expect(data.length).toBe(3);
      data.forEach(record => {
        expect(record.price >= 1.00).toBeTruthy();
      });
      done();
    });
  });

  test('should be able to filter records by "ne" match of number', (done) => {
    const query: DataQuery = {
      filterBy: [{
        type: 'number',
        field: 'price',
        value: 1.00,
        match: 'ne'
      }]
    };
    source.fetchData(query).subscribe((data: Donut[]) => {
      expect(data.length).toBe(7);
      data.forEach(record => {
        expect(record.price !== 1.00).toBeTruthy();
      });
      done();
    });
  });

  test('should be able to filter records using multiple filters', (done) => {
    const query: DataQuery = {
      filterBy: [{
        type: 'string',
        field: 'name',
        value: 'Chocolate',
        match: 'contains'
      }, {
        type: 'number',
        field: 'price',
        value: 0.70,
        match: 'le'
      }]
    };
    source.fetchData(query).subscribe((data: Donut[]) => {
      expect(data.length).toBe(2);
      expect(data[0].name).toBe('Good Old Chocolate');
      expect(data[1].name).toBe('Chocolate Party');
      done();
    });
  });
});

export const DONUTS: Donut[] = [{
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
}, {
  id: '008',
  name: 'Big Chocolate Party',
  type: 'cake',
  price: 1.20,
  weight: 180,
  glaze: 'chocolate',
  hasSprinkles: true
}, {
  id: '009',
  name: 'Apple Fritter',
  type: 'fritter',
  price: 1.00,
  weight: 140,
  glaze: 'vanilla',
  hasSprinkles: false
}];