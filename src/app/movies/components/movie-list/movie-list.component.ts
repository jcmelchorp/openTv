import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Movie } from '../../models/movie.model';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class MovieListComponent implements OnInit {
    @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Input({ required: true }) movies!: Movie[];
  @Output() onMovieEmit = new EventEmitter<string>();
  defaultElevation = 2;
    raisedElevation = 4;
    size = 20;
    page = 0;
    dataSource = new MatTableDataSource<Movie>();
    filteredData: Movie[];
  constructor(private _liveAnnouncer: LiveAnnouncer) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
    if (changes['movies'].currentValue) {
      this.loadPaginatedData(changes['movies'].currentValue);
      this.linkListToPaginator({ pageIndex: this.page, pageSize: this.paginator.pageSize });
    }
  }

  ngOnInit(): void {
    this.loadPaginatedData(this.movies);
    this.linkListToPaginator({ pageIndex: this.page, pageSize: this.size });
  }

  loadPaginatedData(dataObj): void {
    this.dataSource.data = dataObj;
    this.dataSource.paginator = this.paginator;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  linkListToPaginator(obj): void {
    console.log(obj)
    let index = 0,
      startingIndex = obj.pageIndex * obj.pageSize,
      endingIndex = startingIndex + obj.pageSize;


    this.filteredData = this.dataSource.filteredData.filter(() => {
      index++;
      return (index > startingIndex && index <= endingIndex) ? true : false;
    });

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase()
    this.linkListToPaginator({ pageIndex: this.paginator.pageIndex, pageSize: this.paginator.pageSize });
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
}
