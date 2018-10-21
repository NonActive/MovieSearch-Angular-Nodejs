import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MovieService, Movie } from '../movie-detail/movie.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-film-library',
  templateUrl: './film-library.component.html',
  styleUrls: ['./film-library.component.css']
})
export class FilmLibraryComponent implements OnInit {
  private searchForm: FormGroup;
  private selectedValue: number;
  private genres: any[];
  private countries: any[];

  private movies: Movie[];

  constructor(private movieService: MovieService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.searchForm = this.createFormGroup();

    this.movieService.getGenreEnum().subscribe(genres => {
      this.genres = genres;
    });

    this.movieService.getContryEnum().subscribe(countries => {
      this.countries = countries;
      console.log(this.countries);
    })
  }


  createFormGroup() {
    return new FormGroup({
      countryText: new FormControl(0),
      genreText: new FormControl(0),
      movieTitleText: new FormControl(''),
      fromDateText: new FormControl('')
    });
  }


  onSubmit() {
    let genre = this.genres.find(o => o.id === +this.searchForm.value.genreText);
    let country = this.countries.find(o => o.id === +this.searchForm.value.countryText);

    let params = {
      title: this.searchForm.value.movieTitleText,
      genre: genre.title,
      origin: country.title,
      from: this.searchForm.value.fromDateText
    }

    // console.log(params);

    this.router.navigate([this.activatedRoute.routeConfig.path], {
      queryParams: params
    })
  }

  isEmptyObject(obj) {
    return (obj && (Object.keys(obj).length === 0));
  }

  ngOnInit() {
    // let genres = ["-všechny-", "Akční", "Animovaný", "Dobrodružný", "Dokumentární", "Drama", "Erotický", "Experimentální", "Fantasy", "Film-NoirHistorický", "Horor",
    //   "Hudební", "Katastrofický", "Komedie", "Krátkometrážní", "Krimi", "Muzikál", "Mysteriózní", "Pohádka", "Psychologický", "Publicistický", "Reality-TV", "Road movie",
    //   "Rodinný", "Romantický", "Sci-Fi", "Sportovní", "Telenovela", "Thriller", "Válečný", "Western", "Životopisný"];

    // this.genres = genres.map((curr, index) => {
    //   return {
    //     id: index,
    //     title: curr
    //   }
    // });

    this.selectedValue = 0;

    this.activatedRoute.queryParams.subscribe((queryParams) => {
      if (this.isEmptyObject(queryParams)) {
        return;
      }
      
      let params = new HttpParams()
      .set('title', queryParams['title'])
      .set('genre', queryParams['genre'])
      .set('origin', queryParams['origin'])
      .set('from', queryParams['from']);

      this.movieService.searchMovies(params).subscribe((movies) => {
        this.movies = movies;
      });
    });
  }

}
