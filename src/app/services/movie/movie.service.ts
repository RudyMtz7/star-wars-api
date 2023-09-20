import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = 'https://swapi.dev/api/films/';

  constructor(private http: HttpClient) {}

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.apiUrl);
  }

  // Fetch a specific movie by episode ID
  getMovieByEpisodeId(episodeId: number): Observable<any> {
    const url = `${this.apiUrl}${episodeId}/`;
    return this.http.get(url);
  }
}
