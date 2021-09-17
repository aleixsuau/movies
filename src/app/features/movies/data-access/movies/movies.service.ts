import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private baseUrl = `https://www.omdbapi.com/?apikey=925a5af6`;

  constructor(private http: HttpClient) { }

  searchMovies(title: string): Observable<IAPIResponse> {
    const s = title;
    let params = {};
    const endpoint = `${this.baseUrl}`;

    if (title) {
      params = { ...params, s };
    }

    return this.http.get<IAPIResponse>(endpoint, { params });
  }

  getMovie(id: string): Observable<IAPIResponse> {
    const endpoint = `${this.baseUrl}`;
    let params = {};

    if (id) {
      params = { ...params, i: id };
    }

    return this.http.get<IAPIResponse>(endpoint, { params });
  }
}
