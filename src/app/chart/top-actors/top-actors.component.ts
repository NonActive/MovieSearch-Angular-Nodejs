import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/movie-detail/movie.service';

@Component({
  selector: 'app-top-actors',
  templateUrl: './top-actors.component.html',
  styleUrls: ['./top-actors.component.css']
})
export class TopActorsComponent implements OnInit {
  private actors: any[]; 

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.movieService.getTopActors().subscribe((topActors) => {
      this.actors = topActors;
    });
  }

}
  