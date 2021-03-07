import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
const corona = 'https://pomber.github.io/covid19/timeseries.json' ;
//const country ='https://pomber.github.io/covid19/countries.json';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class RestService {
  constructor(private http: HttpClient) {}
  private extractData(res: Response) {
    let body = res;
    return body || { };
  }


  getCorona(): Observable<any> {
    return this.http.get(corona).pipe(
      map(this.extractData));
  }
/*
  getCountry(): Observable<any> {
    return this.http.get(country).pipe(
      map(this.extractData));
  }
*/
   private handleError<T> (operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
        console.error(error); // log to console instead
        console.log(`${operation} failed: ${error.message}`);
        return of(result as T);
      };
    }
}
