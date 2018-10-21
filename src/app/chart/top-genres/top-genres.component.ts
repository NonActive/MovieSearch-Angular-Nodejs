import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/movie-detail/movie.service';

@Component({
  selector: 'app-top-genres',
  templateUrl: './top-genres.component.html',
  styleUrls: ['./top-genres.component.css']
})
export class TopGenresComponent implements OnInit {
  private genres: any[];

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.movieService.getTopGenres().subscribe((topGenres) => {
      this.genres = topGenres;
      console.log(this.genres);
    });
  }

}
