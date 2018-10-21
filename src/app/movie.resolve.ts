import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Movie, MovieService } from './movie-detail/movie.service'

@Injectable()
export class MovieResolve implements Resolve<any> {
    constructor(private movieService: MovieService) {}

    resolve(route: ActivatedRouteSnapshot) {
        return this.movieService.getMovie(route.paramMap.get('id'));
    }
} 