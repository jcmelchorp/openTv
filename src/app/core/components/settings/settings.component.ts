import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons';
import { Observable, map } from 'rxjs';

import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { toggleDarkMode } from '../../state/config.actions';
import { isDarkMode } from '../../state/config.selectors';
import { LayoutService } from '../../services/layout.service';
import { ThemeService } from '../../services';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  defaultElevation = 4;
  raisedElevation = 6;
  faSun = faSun;
  faMoon = faMoon;
  langs!: string[];
  langForm!: FormGroup;
  isDarkTheme$!: Observable<boolean>;
  isDarkTheme!: boolean;
  constructor(
    public translate: TranslateService,
    private layoutService: LayoutService,
    public themeService: ThemeService,
    private fb: FormBuilder,
    private store: Store<AppState>,

  ) {
    this.langs = translate.getLangs();
    this.langForm = this.fb.group({
      selectedLang: new FormControl(translate.currentLang)
    });
  }
  ngOnInit(): void {
    this.isDarkTheme$ = this.store.select(isDarkMode).pipe(map((isDark: boolean) => this.isDarkTheme = isDark));
  }

  toggleDarkTheme(isDarkTheme: boolean) {
    // console.log(isDarkTheme)
    this.store.dispatch(toggleDarkMode({ isDark: isDarkTheme }));
  }
  switchLang(lang: string) {
    this.translate.use(lang);
  }


}
