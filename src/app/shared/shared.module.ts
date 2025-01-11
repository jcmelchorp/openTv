import { ModuleWithProviders, NgModule } from '@angular/core';
//import { TranslateModule } from '@ngx-translate/core';
import { commonModules, formsModules, uiModules } from '../material';
import { sharedComponents } from './components';
import { sharedServices } from './services';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { HlsVideoPlayerDirective } from './directives/hls-video-player.directive';
import { StylePaginatorDirective } from '../material/style-paginator.directive';
import { sharedDirectives } from './directives';

@NgModule({
  declarations: [...sharedComponents,...sharedDirectives  ],
  imports: [...commonModules, ...formsModules, ...uiModules],
  exports: [...sharedDirectives, ...sharedComponents, ...commonModules, ...formsModules, ...uiModules],
  providers: [...sharedServices]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [...sharedServices,
      {
        provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true
      }]
    }
  }
}
