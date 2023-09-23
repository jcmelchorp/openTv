import { Component, OnInit } from '@angular/core';
import { faVirus } from '@fortawesome/free-solid-svg-icons';
// import { TranslateService } from '@ngx-translate/core';
// import regions from '../../../../assets/data/regions.json';

import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Language } from 'src/app/core/models/language.model';
import { Region } from 'src/app/core/models/region.model';
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
    // this.array.forEach((obj) => {
    //   let id = obj.code;
    //   this.new.push({ [id]: { ...obj } });
    //   console.log({ [id]: { ...obj } });
    // });


  }
  get dataUri(): SafeUrl {
    const jsonData = JSON.stringify(...[this.new]);
    const uri = 'data:application/json;charset=UTF-8,' + encodeURIComponent(jsonData);
    return this.sanitizer.bypassSecurityTrustUrl(uri);
  }
}
