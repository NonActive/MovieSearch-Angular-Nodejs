import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TopMoviesComponent } from './top-movies/top-movies.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { MovieResolve } from './movie.resolve';
import { ChartComponent } from './chart/chart.component';
import { TopActorsComponent } from './chart/top-actors/top-actors.component';
import { FilmLibraryComponent } from './film-library/film-library.component';
import { TopGenresComponent } from './chart/top-genres/top-genres.component';

const routes: Routes = [
  {
		path: '',
		component: HomeComponent
  },
  {
    path: 'chart',
    component: ChartComponent,
    children: [
      { path: '', redirectTo: 'top-movies', pathMatch: 'full' },
      { path: 'top-movies', component: TopMoviesComponent },
      { path: 'top-actors', component: TopActorsComponent},
      { path: 'top-genres', component: TopGenresComponent}

    ]
  },
  {
    path: 'title/:id',
    component: MovieDetailComponent,
    resolve: {
      movie: MovieResolve
    }
  },
  {
    path: 'film-library',
    component: FilmLibraryComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
