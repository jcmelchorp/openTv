import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription, firstValueFrom, map, take } from 'rxjs';


import { IptvDto } from '../../models/iptv-dto.model';
import { IptvsEntityService } from 'src/app/store/iptv/iptvs-entity.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Languages } from '../../models/languages.enum';
import { Countries } from '../../models/countries.enum';

@Component({
  selector: 'app-surfer',
  templateUrl: './surfer.component.html',
  styleUrls: ['./surfer.component.scss'],
})
export class SurferComponent implements OnInit {
  iptv$!: Observable<IptvDto>;
  iptvs$!: Observable<IptvDto[]>;
  isLoading$!: Observable<boolean>;
  isLoaded$!: Observable<boolean>;
  public selectedIptv?: IptvDto;
  iptvsCount$!: Observable<number>;
  firstSource = 'XEIPN-TDT';
  filterValues: FormGroup;
  filteredEntities$: Observable<IptvDto[]>;
  // subscription: Subscription;
  // lang = Languages;
  // countries = Countries;
  // langKeys: string[];
  // countryKeys: string[];

  constructor(
    private iptvsEntityService: IptvsEntityService,
    // private fb: FormBuilder,
  ) {
    // this.langKeys = Object.keys(this.lang);
    // this.countries = Object.values(Countries);
    // this.countryKeys = Object.keys(this.countries);
    // this.filterValues = this.fb.group({
    //   countryCode: new FormControl(),
    //   languageCodes: new FormControl(),
    // });
    // this.subscription = this.filterValues.valueChanges
    //   .subscribe((changes) => {
    //     Object.keys(changes).forEach((key) => changes[key] == null && delete changes[key]);
    //     this.iptvsEntityService.setFilter(changes);
    //     // if (this.dataSource.paginator) {
    //     //   this.dataSource.paginator.firstPage();
    //     // }
    //   });

  }

  ngOnInit(): void {
    this.iptvsCount$ = this.iptvsEntityService.count$;
    this.isLoading$ = this.iptvsEntityService.loading$;
    this.isLoaded$ = this.iptvsEntityService.loaded$;
    this.iptvs$ = this.iptvsEntityService.entities$;
    this.filteredEntities$ = this.iptvsEntityService.filteredEntities$;
    this.iptv$ = this.selectIptv(this.firstSource);
  }
  // setFilter(countryCode?: string) {
  //   this.iptvsEntityService.setFilter({ countryCode: countryCode });
  // }

  selectIptv(channelName: string) {
    return this.iptvs$
      .pipe(
        map((iptvArray) => iptvArray.find((iptv) => iptv.channelName === channelName))
      );
  }
  notify(channelName: string) {
    this.selectIptv(channelName);
  }


  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.

  }
}
