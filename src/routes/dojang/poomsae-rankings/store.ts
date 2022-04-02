import { fromFetch } from "rxjs/fetch";
import { catchError, map, Observable, of, switchMap } from "rxjs";
import { ArrayDataSource } from "$lib/modules/array-data-source";
import { DataSourceManager } from "$lib/modules/data-source";

export type CompetitorRank = {
  division: string;
  belt: string;
  name: string;
  gender: string;
  totalpoints: number;
}

export type RecognizedCompetitorStoreParams = {
  sourceUrl: string;
  type: 'recognized';
  division: 'Cadet' | 'Junior' | 'Senior';
  gender: 'Male' | 'Female';
}
export type FreestyleCompetitorStoreParams = {
  sourceUrl: string;
  type: 'freestyle';
  division: '17 & Under Freestyle' | '18 & Over Freestyle';
  gender: 'Male' | 'Female';
}

export type CompetitorStoreParams = RecognizedCompetitorStoreParams | FreestyleCompetitorStoreParams;

export function generateCompetitorDataSourceManager(query: CompetitorStoreParams): Observable<DataSourceManager<CompetitorRank>> {
  return fromFetch(query.sourceUrl).pipe(
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
      return new DataSourceManager<CompetitorRank>(source);
    })
  );
}
