import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation, inject } from '@angular/core';
import { Observable, Subscription, firstValueFrom, map, take } from 'rxjs';
import { IptvDto } from '../../models/iptv-dto.model';
import { IptvsEntityService } from 'src/app/store/iptv/iptvs-entity.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Countries } from '../../models/countries.enum';
import { ActivatedRoute } from '@angular/router';
import { Categories } from '../../models/categories.enum';

export interface StateGroup {
  letter: string;
  checked: boolean;
  names: string[];
}
@Component({
  selector: 'app-surfer',
  templateUrl: './surfer.component.html',
  styleUrls: ['./surfer.component.scss'],
  //encapsulation: ViewEncapsulation.None
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
  countries = Countries;
  // subdivisions = Subdivisions;
  // subdivisionKeys = Object.keys(Subdivisions);
  subscription: Subscription;
  filterValues: FormGroup;
  selectCategory: string;
  selectCountryCode: string;
  isExpandCategory: boolean[] = [];
  states = new FormControl();
  stateRecord: any = [];
  countrySubKeys: any[]
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
      // subdivisions: new FormControl([]),
      category: new FormControl(''),
    });

    // this.filterValues.patchValue({ conutryCode: 'MX' });

  }

  ngOnInit(): void {
    // this.countrySubKeys = this.countryKeys.map((key) => {
    //   return { letter: key, names: this.subdivisionKeys.filter((subKey) => subKey.startsWith(key)), checked: false };
    // });
    // this.iptvsCount$ = this.iptvsEntityService.count$;
    this.subscription = this.filterValues.valueChanges
      .subscribe(((changes) => {
        Object.keys(changes).forEach((key) => changes[key] == null && delete changes[key]);
        this.iptvsEntityService.setFilter(changes);
      }));
    this.selectFilter()
    this.isLoading$ = this.iptvsEntityService.loading$;
    this.isLoaded$ = this.iptvsEntityService.loaded$;
    this.iptvs$ = this.iptvsEntityService.filteredEntities$.pipe(
      map(entities => entities.filter(entity => entity.url)));/*.pipe(
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
  get category(): string {
    return this.filterValues.get('category').value;
  }
  // get subdivisions(): string[] {
  //   return this.filterValues.get('subdivisions').value;
  // }
  selectFilter() {
    let obj = {
      // subdivision: this.subdivisions ? this.subdivisions.join('@@') : null, 
      countryCode: this.countryCode,// ? this.countryCode : this.subdivisions.slice(0, 2)[0], 
      category: this.category
    };
    Object.keys(obj).forEach((key) => obj[key] == null && delete obj[key]);
    this.iptvsEntityService.setFilter(...[obj]);
    // console.log(obj)
  }

  // onCountryChange(event: any) {
  // this.selectCountryCode = event.value;
  // console.log("onCountryChange", this.selectCountryCode);
  // this.subdivisionKeys = Object.keys(this.subdivisions[this.selectCountryCode]);
  // this.filterValues.patchValue({ countryCode: this.selectCountryCode });
  // this.selectFilter();
  // }
  // expandDocumentTypes(group: any) {
  //   console.log("expanding dropdown", group);
  //   let names = this.subdivisions[group];
  //   this.isExpandCategory[group] = !this.isExpandCategory[group];
  //   // expand only selected parent dropdown category with that childs
  // }

  // toggleSelection(event: any, name: any, group: any) {
  //   console.log("toggleSelection", name, event.checked, group);
  //   if (event.checked) {
  //     console.log("stastateRecordtelist", this.stateRecord);
  //     this.stateRecord.push(name);
  //     this.states.setValue(this.stateRecord);
  //     console.log("toggleselection ", this.states.value);
  //   }
  //   else {
  //     console.log("else toggleselection", name, group, this.states.value);
  //     this.states.setValue(this.states.value.filter((x: any) => x !== name));
  //     console.log("after filter ", this.states.value);
  //     //this.states.setValue([]);
  //   }
  // }

  // toggleParent(event: any, group: any) {
  //   group.checked = event.checked;
  //   console.log("event", event.checked, "group", group, "states value", this.states.value);
  //   let states = this.states.value;
  //   states = states ? states : [];
  //   if (event.checked) {
  //     states.push(...group.names)
  //   } else {
  //     console.log("else", states);
  //     group.names.forEach((x: string) => states.splice(states.indexOf(x), 1));
  //   }
  //   this.states.setValue(states);
  //   console.log("statesvalue", this.states.value);
  //   if (!event.checked) {
  //     this.states.setValue(this.states.value.filter((x: any) => !x.includes(group.names)))
  //     //this.states.setValue([]);
  //   }
  //   console.log("final statesvalue", this.states.value);
  // }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();

  }





  // expandDocumentTypes(group: any) {
  //   console.log("expanding dropdown", group);
  //   this.isExpandCategory[group.letter] = !this.isExpandCategory[group.letter];
  //   // expand only selected parent dropdown category with that childs
  // }

  // toggleSelection(event: any, name: any, group: any) {
  //   console.log("toggleSelection", name, event.checked, group);
  //   if (event.checked) {
  //     console.log("stastateRecordtelist", this.stateRecord);
  //     this.stateRecord.push(name);
  //     this.states.setValue(this.stateRecord);
  //     console.log("toggleselection ", this.states.value);
  //   }
  //   else {
  //     console.log("else toggleselection", name, group, this.states.value);
  //     this.states.setValue(this.states.value.filter((x: any) => x !== name));
  //     console.log("after filter ", this.states.value);
  //     //this.states.setValue([]);
  //   }
  // }

  // toggleParent(event: any, group: any) {
  //   group.checked = event.checked;
  //   console.log("event", event.checked, "group", group, "states value", this.states.value);
  //   let states = this.states.value;
  //   states = states ? states : [];
  //   if (event.checked) {
  //     states.push(...group.names)
  //   } else {
  //     console.log("else", states);
  //     group.names.i.forEach((x: string) => states.splice(states.indexOf(x), 1));
  //   }
  //   this.states.setValue(states);
  //   console.log("statesvalue", this.states.value);
  //   if (!event.checked) {
  //     this.states.setValue(this.states.value.filter((x: any) => !x.includes(group.names)))
  //     //this.states.setValue([]);
  //   }
  //   console.log("final statesvalue", this.states.value);
  //   this.filterValues.patchValue({ subdivisions: this.states.value });
  //   this.selectFilter();
  // }

} 
