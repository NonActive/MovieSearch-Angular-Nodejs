import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

export interface Movie {
  title: string,
  genre: string,
  image: string,
  link: string,
  _id: string
}

@Injectable()
export class MovieService {
  private movieUrl = '/api/movie';
  private chartApiURL = '/api/chart';
  private searchApiURL = '/api/search';
  private enumsApiURL = '/api/enums';

  constructor(private http: HttpClient) { }

  getGenreEnum(): Observable<String[]> {
    return this.http.get<String[]>(`${this.enumsApiURL}/genre`).pipe(
      catchError(this.handleError(`getGenreResult`, []))
    );
  }

  getContryEnum(): Observable<String[]> {
    return this.http.get<String[]>(`${this.enumsApiURL}/country`).pipe(
      catchError(this.handleError(`getCountryResult`, []))
    );
  }

  searchMovies(queryParams): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.searchApiURL, { 
      params: queryParams 
    }).pipe(
      catchError(this.handleError(`getSearchResult`, []))
    );
  }


  autocomleteMovies(searchTerm: string): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.movieUrl, {
      params: {
        search: searchTerm
      }
    }).pipe(
      catchError(this.handleError(`getSearchResult`, []))
    );
  }

  getMovie(id: string): any {
    return this.http.get<any>(`${this.movieUrl}/${id}`);
  }

  getTopMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.chartApiURL}/top-movies`).pipe(
      catchError(this.handleError(`getTopMoviesResult`, []))
    );
  }

  getTopActors(): Observable<any[]> {
    return this.http.get<any[]>(`${this.chartApiURL}/top-actors`).pipe(
      catchError(this.handleError(`getTopActorsResult`, []))
    );
  }

  getTopGenres(): Observable<any[]> {
    return this.http.get<any[]>(`${this.chartApiURL}/top-genres`).pipe(
      catchError(this.handleError(`getTopGenresResult`, []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      return of(result as T);
    }
  }
}