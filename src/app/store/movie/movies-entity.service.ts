import * as fromMovie from '.';
import { Injectable } from '@angular/core';
import {
    EntityCollectionServiceBase,
    EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { Movie } from 'src/app/movies/models/movie.model';

@Injectable()
export class MoviesEntityService extends EntityCollectionServiceBase<Movie> {
    constructor(
        readonly serviceElementsFactory: EntityCollectionServiceElementsFactory
    ) {
        super(fromMovie.entityCollectionName, serviceElementsFactory);
    }
}