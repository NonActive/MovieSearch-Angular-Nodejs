import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from './movie.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  private movie: Movie;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {  
    this.movie = this.route.snapshot.data['movie'];
    console.log('movie', this.movie);
  }

}
