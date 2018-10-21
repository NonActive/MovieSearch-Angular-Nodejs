import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgSelectComponent } from '@ng-select/ng-select';
import { concat, Observable, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Movie, MovieService } from '../movie-detail/movie.service';



@Component({
  selector:
    'app-search',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('searchBox') ngSelect: NgSelectComponent;
  selectedMovie: any;
  movies: Movie[];

  searchForm: FormGroup;
  terms: string;

  movies$: Observable<Movie[]>;
  movieInput$ = new Subject<string>();

  constructor(private movieService: MovieService,
    private formBuilder: FormBuilder,
    private router: Router) {

  }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      searchInput: [null, Validators.required]
    });

    this.searchMovie();
  }

  private searchMovie() {
    this.movies$ = concat(
      of([]), // default items
      this.movieInput$.pipe(
        debounceTime(50),
        distinctUntilChanged(),
        switchMap(term => this.movieService.autocomleteMovies(term))
      )
    );
  }

  onSelect(movie: Movie) {
    this.router.navigate(['title', movie._id]);
  }

  disableSearch(term: string, item: Movie) {
    return true;
  }
}
