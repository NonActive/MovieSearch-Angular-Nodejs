import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';
import { Ng2CompleterModule } from "ng2-completer";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { MovieService } from './movie-detail/movie.service';
import { TopMoviesComponent } from './top-movies/top-movies.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { MovieResolve } from './movie.resolve';
import { ChartComponent } from './chart/chart.component';
import { TopActorsComponent } from './chart/top-actors/top-actors.component';
import { FilmLibraryComponent } from './film-library/film-library.component';
import { TopGenresComponent } from './chart/top-genres/top-genres.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TopMoviesComponent,
    MovieDetailComponent,
    ChartComponent,
    TopActorsComponent,
    FilmLibraryComponent,
    TopGenresComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    CommonModule,
    Ng2CompleterModule

  ],
  providers: [
    MovieService,
    MovieResolve
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
