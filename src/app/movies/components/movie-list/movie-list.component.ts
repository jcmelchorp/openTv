import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Movie } from '../../models/movie.model';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class MovieListComponent implements OnInit {
  @Input({ required: true }) movies!: Movie[];
  @Output() onMovieEmit = new EventEmitter<string>();
  dataSource!: MatTableDataSource<Movie>;
  defaultElevation = 2;
  raisedElevation = 4;
  isLoading = false;
  constructor(private _liveAnnouncer: LiveAnnouncer) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['movies'].currentValue) {
      this.isLoading = false;
    }
  }

  ngOnInit(): void { }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase()
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
