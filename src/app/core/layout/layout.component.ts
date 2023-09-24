import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { NavigationStart, NavigationEnd, NavigationCancel, NavigationError, Router, Event, RouterEvent } from '@angular/router';

//import { TranslateService } from '@ngx-translate/core';

import { Observable } from 'rxjs';

import { LayoutService } from '../services/layout.service';
import { isDarkMode } from '../state/config.selectors';
import { setDarkMode } from '../state/config.actions';
import { AppState } from 'src/app/store/app.state';
import { Store } from '@ngrx/store';
import { ThemeService } from '../services';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  isHandset$!: Observable<boolean>;
  isDarkTheme!: Observable<boolean>;
  loading = false;
  constructor(
    private themeService: ThemeService,
    private layoutService: LayoutService,
    private overlay: OverlayContainer,
    private router: Router,
    private store: Store<AppState>

  ) {
    this.router.events.subscribe(event => this.navigationInterceptor(event as RouterEvent));
  }
  ngOnInit(): void {
    this.isDarkTheme = this.store.select(isDarkMode);
    const isDark: boolean = JSON.parse(localStorage.getItem('rds-config-is-dark') || 'false');
    if (isDark) {
      this.store.dispatch(setDarkMode({ isDark: isDark }));
    }
    this.isDarkTheme.subscribe((isDark) => {
      if (isDark) {
        this.overlay.getContainerElement().classList.add('theme-alternate');
      } else {
        this.overlay.getContainerElement().classList.remove('theme-alternate');
      }
    });
    this.isHandset$ = this.layoutService.isHandset$;
  }

  // Shows and hides the loading spinner during RouterEvent changes
  navigationInterceptor(event: RouterEvent): void {
    switch (true) {
      case event instanceof NavigationStart: {
        this.loading = true;
        break;
      }
      case event instanceof NavigationEnd:
      case event instanceof NavigationCancel:
      case event instanceof NavigationError: {
        this.loading = false;
        break;
      }
      default: {
        break;
      }
    }
  }
}
