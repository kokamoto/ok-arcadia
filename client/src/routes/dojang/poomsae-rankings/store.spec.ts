import type { DataSourceManager } from '$lib/modules/data-source';
import { flatMap, map, mergeMap, switchMap } from 'rxjs';
import type { Readable } from 'svelte/store';
import { setUpFetchStub } from '../../../lib/utilities/testUtils';
import { CompetitorRank, generateCompetitorDataSourceManager } from './store';

const COMPETITORS: CompetitorRank[] = [{
  name: 'Anderson Apple',
  belt: 'Black',
  division: 'Cadet',
  gender: 'Male',
  totalpoints: 100
}, {
  name: 'Bridget Banana',
  belt: 'Black',
  division: 'Junior',
  gender: 'Female',
  totalpoints: 110
}, {
  name: 'Claire Cantalope',
  belt: 'Black',
  division: 'Cadet',
  gender: 'Female',
  totalpoints: 150
}]

describe('Poomsae Competitor Store Generator', () => {
  let manager:  DataSourceManager<CompetitorRank>;
  beforeAll(() => {
    global.fetch = jest.fn().mockImplementation(setUpFetchStub(COMPETITORS));
  });

  beforeEach((done) => {
    generateCompetitorDataSourceManager({
      sourceUrl: '/test_recognized.json',
      type: 'recognized',
      gender: 'Female',
      division: 'Cadet'
    }).subscribe(m => {
      manager = m;
      done();
    });
  });

  afterAll(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  it('should generate a DataSourceManager', () => {
    expect(manager.getStore).toBeDefined();
  });

  it('should fetch data', (done) => {
    const store: Readable<CompetitorRank[]> = manager.getStore();
    manager.fetch();
    store.subscribe(data => {
      expect(data.length).toBe(1);
      expect(data[0].name).toBe('Claire Cantalope');
      done();
    });
  });

  it('should default to taking top 10 competitors', () => {
    expect(true).toBeTruthy();
  });

  it('should default to sorting by totalpoints desc', () => {
    expect(true).toBeTruthy();
  });

});