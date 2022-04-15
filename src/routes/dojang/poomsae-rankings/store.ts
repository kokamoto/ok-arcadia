import { fromFetch } from "rxjs/fetch";
import { catchError, map, Observable, of, switchMap } from "rxjs";
import { ArrayDataSource } from "../../../lib/modules/array-data-source";
import { DataSourceManager } from "../../../lib/modules/data-source";
import type { DataQuery } from "../../../lib/modules/data-source";

export type RecognizedDivision = 'Cadet' | 'Junior' | 'Senior';
export type FreestyleDivision = '17 & Under Freestyle' | '18 & Over Freestyle';

export type BeltRank = 'Black';
export type Gender = 'Male' | 'Female';

export type RecognizedCompetitorRank = {
  division: RecognizedDivision;
  belt: BeltRank;
  name: string;
  gender: Gender;
  totalpoints: number;
}

export type FreestyleCompetitorRank = {
  division: FreestyleDivision;
  belt: BeltRank;
  name: string;
  gender: Gender;
  totalpoints: number;
}

export type CompetitorRank = RecognizedCompetitorRank | FreestyleCompetitorRank;

export type RecognizedCompetitorStoreParams = {
  sourceUrl: string;
  type: 'recognized';
  division: RecognizedDivision;
  gender: Gender;
}
export type FreestyleCompetitorStoreParams = {
  sourceUrl: string;
  type: 'freestyle';
  division: FreestyleDivision;
  gender: Gender;
}

export type CompetitorStoreParams = RecognizedCompetitorStoreParams | FreestyleCompetitorStoreParams;

export function generateCompetitorDataSourceManager(params: CompetitorStoreParams): Observable<DataSourceManager<CompetitorRank>> {
  return fromFetch(params.sourceUrl).pipe(
    switchMap(response => {
      if (response.ok) {
        return response.json();
      } else {
        return of({ error: true, message: `ERROR ${response.status}` });
      }
    }),
    catchError(err => {
      console.error(err);
      return of({ error: true, message: err.message })
    }),
    map(data => {
      const source: ArrayDataSource<CompetitorRank> = new ArrayDataSource<CompetitorRank>(data);
      const query: DataQuery = {
        filterBy:  [{
          type: 'string',
          field: 'division',
          value: (params.division as string),
          match: 'exact'
        }, {
          type: 'string',
          field: 'gender',
          value: (params.gender as string),
          match: 'exact'
        }]
      }
      return new DataSourceManager<CompetitorRank>({source, query});
    })
  );
}
