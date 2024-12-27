import { EntityDataService, EntityDefinitionService, EntityServices } from "@ngrx/data";
import { SharedModule } from "../shared/shared.module";

import { MovieRoutingModule } from "./movies-routing.module";

import { EffectsModule } from "@ngrx/effects";
import { NgModule } from "@angular/core";
import * as fromEntity from '../store/config/entity-metadata';
import * as fromMovie from '../store/movie';
import { movieComponents } from "./components";
import { movieContainers } from "./containers";
import { MoviesResolver } from "./resolvers/movies.resolver";
import { movieServices } from "./services";
import { MoviesEffects } from "./state/movies.effects";
import { MoviesDataService } from "../store/movie/movies-data.service";
import { MoviesEntityService } from "../store/movie/movies-entity.service";

@NgModule({
    declarations: [
        ...movieComponents,
        ...movieContainers,
    ],
    imports: [
        SharedModule,
        MovieRoutingModule,
        EffectsModule.forFeature([MoviesEffects]),
    ],
    providers: [
        MoviesResolver,
        ...movieServices,
        MoviesDataService,
        MoviesEntityService,],
})
export class MoviesModule {
    constructor(
        eds: EntityDefinitionService,
        entityServices: EntityServices,
        entityDataService: EntityDataService,
        moviesEntityService: MoviesEntityService,
        moviesDataService: MoviesDataService
    ) {
        eds.registerMetadataMap(fromEntity.entityMetadata);
        entityServices.registerEntityCollectionServices([moviesEntityService]);
        entityDataService.registerService(
            fromMovie.entityCollectionName, moviesDataService
        );
    }
}
