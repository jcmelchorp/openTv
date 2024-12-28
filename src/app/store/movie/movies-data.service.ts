import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator, QueryParams } from '@ngrx/data';
import { Observable, from } from 'rxjs';
import * as fromMovie from '.';
import { Movie } from 'src/app/movies/models/movie.model';
import { MoviesService } from 'src/app/movies/services';

@Injectable()
export class MoviesDataService extends DefaultDataService<Movie> {
    constructor(
        http: HttpClient,
        httpUrlGenerator: HttpUrlGenerator,
        private movieService: MoviesService
    ) {
        super(fromMovie.entityCollectionName, http, httpUrlGenerator);
    }
    override getAll(): Observable<Movie[]> {
        return from(this.movieService.list());
    }
    override update(name): Observable<Movie> {
        return from(this.movieService.getInfo(name));
    }
    // override getWithQuery(queryParams: QueryParams): Observable<MovieDto[]> {
    //     return from(this.movieService.getWithQuery(queryParams));
    // }
}