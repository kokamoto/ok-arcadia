import { setUpFetchStub } from '$lib/utilities/testUtils';
import { generateCompetitorDataSourceManager } from './store';

describe('Poomsae Competitor Store Generator', () => {
  beforeAll(() => {
    jest.spyOn(global, 'fetch').mockImplementation(setUpFetchStub([]));
  });
  afterAll(() => {
    (global.fetch as jest.MockedFunction<any>).mockClear();
  })
  it('should generate a DataSourceManager', (done) => {
    generateCompetitorDataSourceManager({
      sourceUrl: '/test_freestyle.json',
      type: 'recognized',
      gender: 'Female',
      division: 'Cadet'
    }).subscribe(manager => {
      expect(manager.getStore).toBeDefined();
      done();
    });
  });
});