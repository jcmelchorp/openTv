import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { Observable, firstValueFrom, map, merge, of, startWith, switchMap } from 'rxjs';
import { IptvDto } from '../../models/iptv-dto.model';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services';
import { Country } from '../../models/country.model';
import { Countries } from '../../models/countries.enum';
import { Categories } from '../../models/categories.enum';

@Component({
  selector: 'app-iptv-list',
  templateUrl: './iptv-list.component.html',
  styleUrls: ['./iptv-list.component.scss'],
})
export class IptvListComponent implements OnInit, OnChanges, AfterViewInit {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  @ViewChild(MatTable)
  table!: MatTable<IptvDto>;
  @Input({ required: true }) objects!: IptvDto[];
  @Output() onIptvEmit = new EventEmitter<string>();
  dataSource!: MatTableDataSource<IptvDto>;
  isLoading = false;
  // countryKeys = Object.keys(Countries);
  // categoryKeys = Object.keys(Categories);
  // selectedCountry: string = 'MX';
  // selectedCategory: string;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['channelName'/*, 'logo'*/];
  constructor(private _liveAnnouncer: LiveAnnouncer) {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['objects'].currentValue) {
      this.dataSource = new MatTableDataSource(changes['objects'].currentValue);

      // this.table.dataSource = this.dataSource;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
      this.isLoading = false;
    }
  }
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.objects);
    // this.dataSource.filter = this.selectedCountry
    // this.linkListToPaginator();

    // this.dataSource = new IptvListDataSource(this.iptvDtoService);
    // this.linkListToPaginator();
  }
  ngAfterViewInit(): void {
    // console.log(this.dataSource);
    this.table.dataSource = this.dataSource;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    // this.table.dataSource = this.dataSource;
    // this.isLoading = false;
    // this.isLoaded = true;
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase()
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  // playUrl(url: string) {
  //   this.onIptvEmit.emit(url);
  // }
  // goIptv(id: string) {
  //   this._router.navigate(['/iptvs', id]);
  // }

  // this method will link data to paginator
  linkListToPaginator() {
    // merge simply joins all this operators and creates an       //observable that listen to paginator page events
    merge(this.paginator.page).pipe(
      startWith({}),
      switchMap(() => {
        // creates an obserbable of sample data
        return of(this.dataSource.data);
      }))
      .subscribe(res => {
        const from = this.paginator.pageIndex * 10;
        const to = from + 10;
        this.dataSource.data = res.slice(from, to);
      });
  }
}