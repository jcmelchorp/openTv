import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { Observable, firstValueFrom, map, merge, of, startWith, switchMap } from 'rxjs';
import { TdtDto } from '../../models/tdt-dto.model';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Router } from '@angular/router';
import { TdtsDataService } from 'src/app/store/tdt/tdts-data.service';
import { TdtListDataSource } from './tdt-list.datasource';


@Component({
  selector: 'app-tdt-list',
  templateUrl: './tdt-list.component.html',
  styleUrls: ['./tdt-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TdtListComponent implements OnInit, OnChanges, AfterViewInit {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @Input({ required: true }) objects!: TdtDto[];
  @Output() onTdtEmit = new EventEmitter<string>();
  dataSource!: MatTableDataSource<TdtDto>;
  defaultElevation = 2;
  raisedElevation = 4;
  isLoading = false;
  size=24;
page=0;
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
      this.loadPaginatedData(changes['objects'].currentValue);
    }
  }
  ngOnInit(): void {
    this.loadPaginatedData(this.objects);
    this.dataSource.paginator = this.paginator;
    // this.dataSource = new TdtListDataSource(this.tdtDtoService);
     this.linkListToPaginator();
  }
  ngAfterViewInit(): void {
    
    // console.log(this.dataSource);
    // this.table.dataSource = this.dataSource;
    // this.dataSource.sort = this.sort;
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

  loadPaginatedData(dataObj): void {
    this.dataSource = new MatTableDataSource(dataObj);
     this.dataSource.paginator = this.paginator;
     if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    //  this.linkListToPaginator();
    // this.table.dataSource = this.dataSource;

   
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
 
  // this method will link data to paginator
  linkListToPaginator() {
    // merge simply joins all this operators and creates an       //observable that listen to paginator page events
    
       merge(this.paginator.page).pipe(
      startWith({}),
      switchMap(() => {
        // creates an obserbable of sample data
        return of(this.objects);
      }))
      .subscribe(res => {
        const from = this.paginator.pageIndex * this.paginator.pageSize;
        const to = from + this.paginator.pageSize;
        this.dataSource.data = res.slice(from, to);
        this.isLoading = true;
      });
  }
}