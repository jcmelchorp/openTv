import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { merge, of, startWith, switchMap } from 'rxjs';
import { IptvDto } from '../../models/iptv-dto.model';
import { IptvListDataSource } from './iptv-list.datasource';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Router } from '@angular/router';

@Component({
  selector: 'app-iptv-list',
  templateUrl: './iptv-list.component.html',
  styleUrls: ['./iptv-list.component.scss'],
})
export class IptvListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  @ViewChild(MatTable)
  table!: MatTable<IptvDto>;
  @Input({ required: true }) objects!: IptvDto[];
  @Output() onIptvEmit = new EventEmitter<string>();
  dataSource!: MatTableDataSource<IptvDto>;
  public isLoading: boolean = true;
  public isLoaded: boolean = false;
  value: number = 0;
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['logo', 'channelName', 'countryFlag'];
  constructor(private _router: Router, private _liveAnnouncer: LiveAnnouncer) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.objects);

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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

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
  playUrl(url: string) {
    this.onIptvEmit.emit(url);
  }
  goIptv(id: string) {
    this._router.navigate(['/', id]);
  }

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