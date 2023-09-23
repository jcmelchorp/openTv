import { Component } from '@angular/core';
import { SeoService } from './core/generic services';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'openTv';
  constructor(
    private seoService: SeoService,
    public translate: TranslateService,
  ) {
    translate.addLangs(['es', 'en']);
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('es');
    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use(translate.getBrowserLang() || 'es');
    seoService.titleInit();
    seoService.generateTags({
      title: this.title,
      description: 'IP TV Player',
      image: 'assets/icons/openTv_transparent.png',
    });
  }
}
