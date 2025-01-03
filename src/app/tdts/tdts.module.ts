import { EntityDataService, EntityDefinitionService, EntityServices } from "@ngrx/data";
import { HlsVideoPlayerDirective } from "../shared/directive/hls-video-player.directive";
import { SharedModule } from "../shared/shared.module";
import { TdtsDataService } from "../store/tdt/tdts-data.service";
import { TdtsEntityService } from "../store/tdt/tdts-entity.service";
import { TdtRoutingModule } from "./tdts-routing.module";
import { tdtContainers } from "./containers";
import { tdtComponents } from "./components";
import { EffectsModule } from "@ngrx/effects";
import { TdtsResolver } from "./resolvers/tdts.resolver";
import { tdtServices } from "./services";
import { NgModule } from "@angular/core";
import * as fromTdt from '../store/tdt';
import * as fromEntity from '../store/config/entity-metadata';
import { TdtsEffects } from "./state/tdts.effects";

@NgModule({
    declarations: [
        ...tdtComponents,
        ...tdtContainers,
    ],
    imports: [
        SharedModule,
        TdtRoutingModule,
        EffectsModule.forFeature([TdtsEffects]),
    ],
    providers: [
        TdtsResolver,
        ...tdtServices,
        TdtsDataService,
        TdtsEntityService,],
})
export class TdtsModule {
    constructor(
        eds: EntityDefinitionService,
        entityServices: EntityServices,
        entityDataService: EntityDataService,
        tdtEntityService: TdtsEntityService,
        tdtDataService: TdtsDataService
    ) {
        eds.registerMetadataMap(fromEntity.entityMetadata);
        entityServices.registerEntityCollectionServices([tdtEntityService]);
        entityDataService.registerService(
            fromTdt.entityCollectionName, tdtDataService
        );
    }
}
