import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { TdtDto } from '../../models/tdt-dto.model';
import { LiveAnnouncer } from '@angular/cdk/a11y';


@Component({
  selector: 'app-tdt-tiles',
  templateUrl: './tdt-tiles.component.html',
  styleUrls: ['./tdt-tiles.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TdtTilesComponent implements OnInit, OnChanges {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Input({ required: true }) objects!: TdtDto[];
  @Output() onTdtEmit = new EventEmitter<string>();
  defaultElevation = 2;
  raisedElevation = 4;
  size = 20;
  page = 0;
  dataSource= new MatTableDataSource<TdtDto>();
 filteredData: TdtDto[];
  constructor(private _liveAnnouncer: LiveAnnouncer) { }
  
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
    if (changes['objects'].currentValue) {
      this.loadPaginatedData(changes['objects'].currentValue);
      this.linkListToPaginator({ pageIndex: this.page, pageSize: this.paginator.pageSize });
    }
  }

  ngOnInit(): void {
    this.loadPaginatedData(this.objects);
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
}