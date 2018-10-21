import { Component, OnInit } from '@angular/core';
import { MovieService, Movie } from '../movie-detail/movie.service';

@Component({
  selector: 'app-top-movies',
  templateUrl: './top-movies.component.html',
  styleUrls: ['./top-movies.component.css']
})
export class TopMoviesComponent implements OnInit {
  private movies: Movie[];

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.movieService.getTopMovies().subscribe((topMovies) => {
      this.movies = topMovies;
    })
  }

}
