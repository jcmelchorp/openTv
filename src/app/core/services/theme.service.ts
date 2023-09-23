import { Injectable } from '@angular/core';

import { Observable, Subject, of } from 'rxjs';

@Injectable()
export class ThemeService {
  private isDark!: boolean;
  _darkTheme = new Subject<boolean>();
  isDarkTheme = this._darkTheme.asObservable();


  setDarkTheme(isDarkTheme: boolean): void {
    this._darkTheme.next(isDarkTheme);
  }
  toggleDarkTheme(isDark: boolean): Observable<boolean> {
    this._darkTheme.next(!isDark);
    return of(!isDark)
  }

}
