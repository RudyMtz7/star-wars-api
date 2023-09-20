import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShipService } from '../services/ship/ship.service';
import { MovieService } from '../services/movie/movie.service';
import { Ship } from '../models/ship.model';

@Component({
  selector: 'app-ship-list',
  templateUrl: './ship-list.component.html',
  styleUrls: ['./ship-list.component.css']
})
export class ShipListComponent implements OnInit {
  episodeId: number = 0;
  starships: any[] = [];
  starshipsEndpoints: any[] = [];
  selectedShip: Ship | null = null; // Initialize as null

  constructor(
    private route: ActivatedRoute,
    private shipService: ShipService,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.episodeId = +params['episodeId']; // Get the episode ID from the route
      
      this.movieService.getMovieByEpisodeId(this.episodeId).subscribe((data: any) => {
        this.starshipsEndpoints = data.starships;  
        this.fetchStarshipsByEndpoints();
      });
    });
  }

  fetchStarshipsByEndpoints() {
    // Iterate through starship endpoints and fetch each starship by ID
    this.starshipsEndpoints.forEach((endpoint) => {   
      this.shipService.getStarshipById(endpoint).subscribe((data) => {
        this.starships.push(data); // Collect the starship data
      });
    });   
  }
  toggleShipDetail(ship: Ship): void {
    if (this.selectedShip === ship) {
      this.selectedShip = null; // Close the detail if it's already open
    } else {
      this.selectedShip = ship; // Open the detail for the selected ship
    }
  }
}