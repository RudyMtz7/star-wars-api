// src/app/ship.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ShipService {
  private apiUrl = 'https://swapi.dev/api/starships/';

  constructor(private http: HttpClient) {}

  getStarshipsByEpisode(episodeId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}?film=${episodeId}`);
  }
}
