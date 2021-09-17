import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private baseUrl = `https://www.omdbapi.com/?apikey=925a5af6`;

  constructor(private http: HttpClient) { }

  searchMovies(title: string, year?: number): Observable<IMovie[] | null> {
    const s = title;
    let params = {};
    const endpoint = `${this.baseUrl}`;

    if (title) {
      params = { ...params, s };
    }

    if (year) {
      params = { ...params, y: year };
    }

    return this.http
      .get<IAPIResponse>(endpoint, { params })
      .pipe(
        map(response => response.Response ? response.Search : null),
        catchError(err => of(null)),
      );
  }

  getMovie(id: string): Observable<IMovie> {
    const endpoint = `${this.baseUrl}`;
    let params = {};

    if (id) {
      params = { ...params, i: id };
    }

    return this.http.get<IMovie>(endpoint, { params });
  }
}
