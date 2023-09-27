import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { Observable, Subscription, firstValueFrom, map, take } from 'rxjs';


import { IptvDto } from '../../models/iptv-dto.model';
import { IptvsEntityService } from 'src/app/store/iptv/iptvs-entity.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Languages } from '../../models/languages.enum';
import { Countries } from '../../models/countries.enum';
import { ActivatedRoute } from '@angular/router';
import { Categories } from '../../models/categories.enum';

@Component({
  selector: 'app-surfer',
  templateUrl: './surfer.component.html',
  styleUrls: ['./surfer.component.scss'],
})
export class SurferComponent implements OnInit {
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly iptvsEntityService: IptvsEntityService = inject(IptvsEntityService);
  iptv$!: Observable<IptvDto>;
  iptvs$!: Observable<IptvDto[]>;
  isLoading$!: Observable<boolean>;
  isLoaded$!: Observable<boolean>;
  filteredEntities$: Observable<IptvDto[]>;
  countryKeys = Object.keys(Countries);
  categoryKeys = Object.keys(Categories);
  subscription: Subscription;
  filterValues: FormGroup;
  selectCategory: string;
  selectCountryCode: string;
  // lang = Languages;
  // countries = Countries;
  // langKeys: string[];
  // countryKeys: string[];

  constructor(
    private fb: FormBuilder,
  ) {
    // Init form
    this.filterValues = this.fb.group({
      countryCode: new FormControl('MX'),
      categories: new FormControl(''),
    });

    // this.filterValues.patchValue({ conutryCode: 'MX' });

  }

  ngOnInit(): void {
    // this.iptvsCount$ = this.iptvsEntityService.count$;
    this.subscription = this.filterValues.valueChanges
      .subscribe(((changes) => {
        Object.keys(changes).forEach((key) => changes[key] == null && delete changes[key]);
        this.iptvsEntityService.setFilter(changes);
      }));
    this.selectFilter()
    this.isLoading$ = this.iptvsEntityService.loading$;
    this.isLoaded$ = this.iptvsEntityService.loaded$;
    this.iptvs$ = this.iptvsEntityService.filteredEntities$;/*.pipe(
      map((iptvs) => iptvs.filter((iptv) => iptv.countryCode === 'MX'))
    );*/
    //this.filteredEntities$ = this.iptvsEntityService.filteredEntities$;
    // this.iptvs$ = this.route.data.pipe<IptvDto[]>(map((iptvs: IptvDto[]) => iptvs));
    // this.iptv$ = this.selectIptv(this.firstSource);
  }
  // setFilter(filter: any) {
  //   this.iptvsEntityService.filter$
  //   this.iptvsEntityService.setFilter({ countryCode: countryCode });
  // }

  selectIptv(channelId: string) {
    return this.iptvs$
      .pipe(
        map((iptvArray) => iptvArray.filter((iptv) => iptv.channelId === channelId).pop())
      );
  }
  notify(channelId: string) {
    console.log(channelId)
    this.iptv$ = this.selectIptv(channelId);
  }

  // applyFilter() {
  //   const countryCode = this.filterValues.get('countryCode')?.value;
  //   const category = this.filterValues.get('category')?.value;
  //   const countryCodeFilter =
  //     countryCode === undefined || countryCode == null || countryCode == '' ? '' : countryCode;
  //   const categoryFilter =
  //     category === undefined || category == null || category == ''
  //       ? ''
  //       : category.toString();
  //   const filter = `${countryCode}$${category}`;
  //   this.iptvsEntityService.setFilter(filter.trim().toLocaleLowerCase());
  // }

  get countryCode(): string {
    return this.filterValues.get('countryCode').value;
  }
  get categories(): string {
    return this.filterValues.get('categories').value;
  }
  selectFilter() {
    let obj = { countryCode: this.countryCode, categories: this.categories };
    Object.keys(obj).forEach((key) => obj[key] == null && delete obj[key]);
    this.iptvsEntityService.setFilter(obj);
    // console.log(obj)
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }
} 
