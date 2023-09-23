import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title, Meta } from '@angular/platform-browser';
import { NavigationEnd, Router, ActivatedRoute } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { MatDialog } from '@angular/material/dialog';
import { filter, map } from 'rxjs/operators';
import { SnackComponent } from '../components';
@Injectable({
  providedIn: 'root',
})
export class SeoService {
  titlePage!: string;
  constructor(
    private swUpdate: SwUpdate,
    private snackBar: MatSnackBar,
    private titleService: Title,
    private metaService: Meta,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  titleInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        let child = this.activatedRoute.firstChild;
        while (child) {
          if (child.firstChild) {
            child = child.firstChild;
          } else if (child.snapshot.data && child.snapshot.data['title']) {
            return child.snapshot.data['title'];
          } else {
            return null;
          }
        }
        return null;
      })
    ).subscribe((data: any) => {
      if (data) {
        this.titleService.setTitle(data);
      }
    });
  }

  generateTags({
    title = '',
    description = '',
    image = ''
  }): void {
    this.titleService.setTitle(title);
    this.metaService.addTags([
      {
        name: 'keywords', content: ''
      },
      { name: 'description', content: description },
      { name: 'robots', content: 'index, follow' },
      { charset: 'UTF-8' },
      { httpEquiv: 'X-UA-Compatible', content: 'IE=edge' },
      { name: 'author', content: 'Julio César Melchor Pinto' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, shrink-to-fit=no' },
      { name: 'date', content: '2021-02-05', scheme: 'YYYY-MM-DD' },
      { name: 'application-name', content: title },
      { name: 'apple-mobile-web-app-status-bar', content: 'black-translucent' },
      { name: 'theme-color', content: '#1976d2' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'mobile-web-app-capable', content: 'yes' },
      { name: 'msapplication-TileColor', content: '#2b5797' },
      { name: 'msapplication-square70x70logo', content: 'assets/icons/mstile-icon-128.png' },
      { name: 'msapplication-square150x150logo', content: 'assets/icons/mstile-icon-270.png' },
      { name: 'msapplication-square310x310logo', content: 'assets/icons/mstile-icon-558.png' },
      { name: 'msapplication-wide310x150logo', content: 'assets/icons/mstile-icon-558-270.png' },
      // OpenGraph metatags
      { property: 'og:title', content: title },
      { property: 'og:type', content: 'website' },
      /*  { property: 'profile:first_name', content: 'Julio' },
       { property: 'profile:last_name', content: 'Melchor' },
       { property: 'profile:username', content: 'jcmelchorp' },
       { property: 'profile:gender', content: 'male' }, */
      { property: 'og:site_name', content: title },
      { property: 'og:url', content: 'http://rds.edu.mx' },
      { property: 'og:image:url', content: image },
      { property: 'og:image:secure_url', content: image, },
      { property: 'og:image:alt', content: 'Website view example' },
      { property: 'og:image:type', content: 'image/png' },
      { property: 'og:description', content: description },
      { property: 'twitter:card', content: 'summary_large_image' },
      { property: 'twitter:text:title', content: title },
      { property: 'twitter:image', content: image, },
    ]);
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(async () => {
        this.snackBar.open(
          'Se han hecho cambios desde la última visita. Actualiza la página para continuar'
        );
        const alert = await this.dialog.open(SnackComponent, {
          data: {
            header: `This app has been updated!`,
            message: `Newer version of the app is available. It's a quick refresh away!`
          }
        });
      });
    }
  }
}
