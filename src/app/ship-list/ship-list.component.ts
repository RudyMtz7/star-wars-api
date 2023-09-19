import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShipService } from '../services/ship/ship.service';

@Component({
  selector: 'app-ship-list',
  templateUrl: './ship-list.component.html',
  styleUrls: ['./ship-list.component.css']
})
export class ShipListComponent implements OnInit {
  episodeId: number = 0;
  starships: any[] = [];

  constructor(private route: ActivatedRoute, private shipService: ShipService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.episodeId = +params['episodeId']; // Get the episode ID from the route
      this.shipService.getStarshipsByEpisode(this.episodeId).subscribe((data: any) => {
        this.starships = data.results;
      });
    });
  }
}