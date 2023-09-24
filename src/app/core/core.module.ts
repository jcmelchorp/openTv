import { NgModule, Optional, SkipSelf } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { configFeatureKey, configReducer } from './state/config.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ConfigEffects } from './state/config.effects';
import { coreServices } from './services';
import { coreComponents } from './components';
import { layoutComponents } from './layout';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ...layoutComponents,
    ...coreComponents
  ],
  imports: [
    SharedModule,
    StoreModule.forFeature(configFeatureKey, configReducer),
    EffectsModule.forFeature([ConfigEffects])
  ],
  exports: [],
  providers: [...coreServices]
})
export class CoreModule {
  constructor(
    @Optional() @SkipSelf() core: CoreModule) {
    if (core) {
      throw new Error('You should import core module only in the root module')
    }
  }
}
