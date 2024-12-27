import { EntitySelectorsFactory } from "@ngrx/data";
import { createSelector } from "@ngrx/store";
import * as fromMovie from "../../store/movie";
import { getCurrentParams } from "src/app/store/router/router.selectors";
import { Movie } from "../models/movie.model";

export const movieselectors = new EntitySelectorsFactory().create<Movie>(
    fromMovie.entityCollectionName
);

export const selectmovies = createSelector(
    movieselectors.selectEntities,
    (movieEntities) => movieEntities
);

export const selectedmovieById = createSelector(
    getCurrentParams,
    movieselectors.selectEntities,
    (params, movieEntities) =>
        movieEntities.find((u) => u.id == params["id"])
);