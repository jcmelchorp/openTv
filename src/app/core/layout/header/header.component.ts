import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngrx/store';

import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons';
import { faBars, faGlobe, faLightbulb } from '@fortawesome/free-solid-svg-icons';

import { TranslateService } from '@ngx-translate/core';

import { Observable } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { LayoutService } from '../../services/layout.service';
import { ThemeService } from '../../services/theme.service';
import { isDarkMode } from '../../state/config.selectors';
import { AppState } from 'src/app/store/app.state';
import { toggleDarkMode } from '../../state/config.actions';
import { SubscriptionService } from '../../generic services';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class HeaderComponent {
  @Input()
  isHandset!: boolean | null;
  isDarkTheme$!: Observable<boolean>;
  public isDarkTheme!: boolean;
  faGlobe = faGlobe;
  faBars = faBars;
  constructor(
    public translate: TranslateService,
    private layoutService: LayoutService,
    public themeService: ThemeService,
    private subService: SubscriptionService,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private store: Store<AppState>,
  ) {
    this.isDarkTheme$ = this.store.select(isDarkMode).pipe(map((isDark: boolean) => this.isDarkTheme = isDark));

    iconRegistry.addSvgIcon(
      'en',
      sanitizer.bypassSecurityTrustResourceUrl('assets/flags/en.svg')
    );
    iconRegistry.addSvgIcon(
      'es',
      sanitizer.bypassSecurityTrustResourceUrl('assets/flags/es.svg')
    );
  }

  switchLang(lang: string) {
    this.translate.use(lang);
  }
  toggleDarkTheme(isDarkTheme: boolean) {
    // console.log(isDarkTheme)
    this.store.dispatch(toggleDarkMode({ isDark: isDarkTheme }));
  }
  toggleSidenavLeft($event: any) {
    this.layoutService.toggleSidenavLeft.emit($event);
  }
  ngOnDestroy() {
    this.subService.unsubscribeComponent$;
  }
}
