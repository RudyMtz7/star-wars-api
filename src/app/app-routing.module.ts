import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieListComponent } from './movie-list/movie-list.component';
import { ShipListComponent } from './ship-list/ship-list.component';

const routes: Routes = [
  { path: '', component: MovieListComponent },
  { path: 'ships/:episodeId', component: ShipListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
