// src/app/ship.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ship } from 'src/app/models/ship.model';

@Injectable({
  providedIn: 'root'
})
export class ShipService {
  private apiUrl = 'https://swapi.dev/api/starships/';
  private readonly localStorageKey = 'ships';

  constructor(private http: HttpClient) {}

  getStarshipsByEpisode(episodeId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}?film=${episodeId}`);
  }

  // Fetch a starship by ID
  getStarshipById(id: string): Observable<any> {
    const url = id;
    return this.http.get(url);
  }

   // Create a new ship or update an existing one in localStorage
   createOrUpdateShip(ship: Ship): void {
    const ships = this.getAllShips();
    const existingShipIndex = ships.findIndex((s) => s.id === ship.id);

    if (existingShipIndex !== -1) {
      // Ship with the same ID exists, update it
      ships[existingShipIndex] = ship;
    } else {
      // Ship doesn't exist, add it
      ships.push(ship);
    }

    localStorage.setItem(this.localStorageKey, JSON.stringify(ships));
  }

  // Create a new ship and store it in localStorage
  createShip(ship: Ship): void {
    const ships = this.getAllShips();
    ships.push(ship);
    localStorage.setItem(this.localStorageKey, JSON.stringify(ships));
  }

  // Read all ships from localStorage
  getAllShips(): Ship[] {
    const shipsJson = localStorage.getItem(this.localStorageKey);
    return shipsJson ? JSON.parse(shipsJson) : [];
  }

  // Read a single ship by ID from localStorage
  getShipById(id: number): Ship | undefined {
    const ships = this.getAllShips();
    return ships.find((ship) => ship.id === id);
  }

  // Update a ship in localStorage
  updateShip(ship: Ship): void {
    const ships = this.getAllShips();
    const index = ships.findIndex((s) => s.id === ship.id);
    if (index !== -1) {
      ships[index] = ship;
      localStorage.setItem(this.localStorageKey, JSON.stringify(ships));
    }
  }

  // Delete a ship by ID from localStorage
  deleteShip(id: number): void {
    const ships = this.getAllShips();
    const index = ships.findIndex((ship) => ship.id === id);
    if (index !== -1) {
      ships.splice(index, 1);
      localStorage.setItem(this.localStorageKey, JSON.stringify(ships));
    }
  }
}
