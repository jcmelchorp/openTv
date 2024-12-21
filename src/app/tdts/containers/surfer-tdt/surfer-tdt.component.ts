import { Component, inject, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { map, Observable, Subscription } from "rxjs";
import { TdtsEntityService } from "src/app/store/tdt/tdts-entity.service";
import { TdtDto } from "../../models/tdt-dto.model";
import { Countries } from "src/app/iptvs/models/countries.enum";
import { Categories } from "src/app/iptvs/models/categories.enum";
import { Ambits } from "../../models/ambits.enum";

export interface StateGroup {
  letter: string;
  checked: boolean;
  names: string[];
}
@Component({
  selector: 'app-surfer-tdt',
  templateUrl: './surfer-tdt.component.html',
  styleUrls: ['./surfer-tdt.component.scss'],
})
export class SurferTdtComponent implements OnInit {
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly tdtsEntityService: TdtsEntityService = inject(TdtsEntityService);
  tdt$!: Observable<TdtDto>;
  tdts$!: Observable<TdtDto[]>;
  isLoading$!: Observable<boolean>;
  isLoaded$!: Observable<boolean>;
  filteredEntities$: Observable<TdtDto[]>;
  countryKeys = Object.keys(Countries);
  categoryKeys = Object.keys(Ambits);
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
      countryCode: new FormControl(''),
      // subdivisions: new FormControl([]),
      category: new FormControl(''),
    });

    // this.filterValues.patchValue({ conutryCode: 'MX' });

  }

  ngOnInit(): void {
    // this.countrySubKeys = this.countryKeys.map((key) => {
    //   return { letter: key, names: this.subdivisionKeys.filter((subKey) => subKey.startsWith(key)), checked: false };
    // });
    // this.tdtsCount$ = this.tdtsEntityService.count$;
    this.subscription = this.filterValues.valueChanges
      .subscribe(((changes) => {
        Object.keys(changes).forEach((key) => changes[key] == null && delete changes[key]);
        this.tdtsEntityService.setFilter(changes);
      }));
    this.selectFilter()
    this.isLoading$ = this.tdtsEntityService.loading$;
    this.isLoaded$ = this.tdtsEntityService.loaded$;
    this.tdts$ = this.tdtsEntityService.filteredEntities$.pipe(
      map(entities => entities.filter(entity => entity.url && entity.isNsfw.toString() == 'false')));/*.pipe(
      map((tdts) => tdts.filter((tdt) => tdt.countryCode === 'MX'))
    );*/
    //this.filteredEntities$ = this.tdtsEntityService.filteredEntities$;
    // this.tdts$ = this.route.data.pipe<TdtDto[]>(map((tdts: TdtDto[]) => tdts));
    // this.tdt$ = this.selectTdt(this.firstSource);
  }
  // setFilter(filter: any) {
  //   this.tdtsEntityService.filter$
  //   this.tdtsEntityService.setFilter({ countryCode: countryCode });
  // }

  selectTdt(channelId: string) {
    return this.tdts$
      .pipe(
        map((tdtArray) => tdtArray.filter((tdt) => tdt.id === channelId).pop())
      );
  }
  notify(channelId: string) {
    console.log(channelId)
    this.tdt$ = this.selectTdt(channelId);
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
  //   this.tdtsEntityService.setFilter(filter.trim().toLocaleLowerCase());
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
    this.tdtsEntityService.setFilter(...[obj]);
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
