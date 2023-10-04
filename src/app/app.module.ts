import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { getApp, initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { provideAuth, browserPopupRedirectResolver, indexedDBLocalPersistence, initializeAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppStoreModule } from './store/app-store.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { registerLocaleData } from '@angular/common';
// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
import localeEs from "@angular/common/locales/es";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
registerLocaleData(localeEs, "es");

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule.forRoot(),
    HttpClientModule,
    AppStoreModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
    NgbModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:1000'
    }),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      easing: 'ease-in',
      closeButton: true,
    }),
    TranslateModule.forRoot({
      defaultLanguage: 'es',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => {
      const auth = initializeAuth(getApp(), {
        persistence: indexedDBLocalPersistence,
        popupRedirectResolver: browserPopupRedirectResolver,
      });
      // if (environment.useAuthEmulator) {
      //   connectAuthEmulatorInDevMode(auth);
      // }
      return auth;
    }),
    provideFirestore(() => {
      const firestore = getFirestore();
      // if (environment.useFirestoreEmulator) {
      //   connectFirestoreEmulatorInDevMode(firestore);
      // }
      /* enableMultiTabIndexedDbPersistence(firestore).then(
        () => resolvePersistenceEnabled(true),
        () => resolvePersistenceEnabled(false)
      ); */
      return firestore;
    }),
    provideDatabase(() => {
      const database = getDatabase(getApp(),
        //   environment.useDatabaseEmulator ?
        //     'http://localhost:9000/?ns=escuela-rafael-diaz-serdan-default-rtdb' :
        //     'https://escuela-rafael-diaz-serdan-default-rtdb.firebaseio.com/');
        // if (environment.useDatabaseEmulator) {
        // connectDatabaseEmulatorInDevMode(database)
      );
      // }
      return database;
    }),
    // provideAnalytics(() => getAnalytics()),
    // provideAuth(() => getAuth()),
  ],
  providers: [{ provide: LOCALE_ID, useValue: "es" },
    ScreenTrackingService, UserTrackingService, ScreenTrackingService, UserTrackingService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
