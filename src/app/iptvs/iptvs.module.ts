import { NgModule } from '@angular/core';
import { iptvContainers } from './containers';
import { HlsVideoPlayerDirective } from './directive/hls-video-player.directive';
import { iptvServices } from './services';
import { IptvsDataService } from '../store/iptv/iptvs-data.service';
import { IptvsEntityService } from '../store/iptv/iptvs-entity.service';
import { EntityDataService, EntityDefinitionService, EntityServices } from '@ngrx/data';
import * as fromIptv from '../store/iptv';
import * as fromEntity from '../store/config/entity-metadata';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from '../shared/shared.module';
import { IptvRoutingModule } from './iptvs-routing.module';
import { IptvsEffects } from './state/iptvs.effects';
import { iptvComponents } from './components';
import { IptvsResolver } from './resolvers/iptvs.resolver';
@NgModule({
  declarations: [
    ...iptvComponents,
    ...iptvContainers,
  ],
  imports: [
    SharedModule,
    IptvRoutingModule,
    EffectsModule.forFeature([IptvsEffects]),
  ],
  providers: [
    IptvsResolver,
    ...iptvServices,
    IptvsDataService,
    IptvsEntityService,],
})
export class IptvsModule {
  constructor(
    eds: EntityDefinitionService,
    entityServices: EntityServices,
    entityDataService: EntityDataService,
    iptvEntityService: IptvsEntityService,
    iptvDataService: IptvsDataService
  ) {
    eds.registerMetadataMap(fromEntity.entityMetadata);
    entityServices.registerEntityCollectionServices([iptvEntityService]);
    entityDataService.registerService(
      fromIptv.entityCollectionName, iptvDataService
    );
  }
}
