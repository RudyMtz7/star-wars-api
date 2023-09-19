import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShipService } from '../services/ship/ship.service';
import { Ship } from '../models/ship.model';

@Component({
  selector: 'app-ship-list',
  templateUrl: './ship-list.component.html',
  styleUrls: ['./ship-list.component.css']
})
export class ShipListComponent implements OnInit {
  episodeId: number = 0;
  starships: any[] = [];
  selectedShip: Ship | null = null; // Initialize as null

  constructor(private route: ActivatedRoute, private shipService: ShipService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.episodeId = +params['episodeId']; // Get the episode ID from the route
      this.shipService.getStarshipsByEpisode(this.episodeId).subscribe((data: any) => {
        this.starships = data.results;
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