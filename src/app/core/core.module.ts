import { NgModule, Optional, SkipSelf } from '@angular/core';
import { coreComponents } from './components';
import * as fromIptv from '../store/iptv';
import * as fromEntity from '../store/config/entity-metadata';
import { layoutComponents } from './layout';
import { StoreModule } from '@ngrx/store';
import { configFeatureKey, configReducer } from './state/config.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ConfigEffects } from './state/config.effects';
import { iptvServices } from './services';
import { IptvDataService } from '../store/iptv/iptv-data.service';
import { IptvEntityService } from '../store/iptv/iptv-entity.service';
import { EntityDefinitionService, EntityServices, EntityDataService } from '@ngrx/data';
import { IptvResolver } from '../store/resolvers/iptv.resolver';
import { iptvContainers } from './containers';
import { genericServices } from './generic services';
import { HlsVideoPlayerDirective } from './services/hls-video-player.directive';
import { commonModules, formsModules, uiModules } from '../material';

@NgModule({
  declarations: [
    ...layoutComponents,
    ...coreComponents,
    ...iptvContainers,
    HlsVideoPlayerDirective,
  ],
  imports: [
    ...commonModules, ...formsModules, ...uiModules,
    StoreModule.forFeature(configFeatureKey, configReducer),
    EffectsModule.forFeature([ConfigEffects])
  ],
  exports: [],
  providers: [
    IptvResolver,
    ...iptvServices,
    ...genericServices,
    IptvDataService,
    IptvEntityService,
  ]
})
export class CoreModule {
  constructor(
    eds: EntityDefinitionService,
    entityServices: EntityServices,
    entityDataService: EntityDataService,
    iptvEntityService: IptvEntityService,
    iptvDataService: IptvDataService,
    @Optional() @SkipSelf() core: CoreModule) {
    if (core) {
      throw new Error('You should import core module only in the root module')
    }
    eds.registerMetadataMap(fromEntity.entityMetadata);
    entityServices.registerEntityCollectionServices([iptvEntityService]);
    entityDataService.registerService(
      fromIptv.entityCollectionName, iptvDataService
    );
  }




}
