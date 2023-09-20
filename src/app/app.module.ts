import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms'; 

import { AppComponent } from './app.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { AppRoutingModule } from './app-routing.module';
import { ShipListComponent } from './ship-list/ship-list.component';
import { ShipDetailComponent } from './ship-detail/ship-detail.component';
import { MoneyFormatPipe } from './util/money-format.pipe';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    MovieListComponent,
    ShipListComponent,
    ShipDetailComponent,
    MoneyFormatPipe,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [MoneyFormatPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
