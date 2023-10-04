import { Component, HostListener, OnInit } from '@angular/core';
import { faVirus } from '@fortawesome/free-solid-svg-icons';
// import { TranslateService } from '@ngx-translate/core';
// import regions from '../../../../assets/data/regions.json';

import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent implements OnInit {
  virus = faVirus;
  public filename: string = "regions_.json";
  new: {}[] = [];
  constructor(private sanitizer: DomSanitizer) { }
  // switchLang(lang: string) {
  //   this.translate.use(lang);
  // }
  // array: Region[] = regions as Region[];

  ngOnInit(): void {


  }

}


