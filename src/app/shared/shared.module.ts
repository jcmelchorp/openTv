import { ModuleWithProviders, NgModule } from '@angular/core';
//import { TranslateModule } from '@ngx-translate/core';
import { commonModules, formsModules, uiModules } from '../material';
import { sharedComponents } from './components';
import { sharedServices } from './services';

@NgModule({
  declarations: [...sharedComponents],
  imports: [...commonModules, ...formsModules, ...uiModules],
  exports: [...sharedComponents, ...commonModules, ...formsModules, ...uiModules],
  providers: [...sharedServices]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [...sharedServices]
    }
  }
}
