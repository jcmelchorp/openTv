import { Observable, of as observableOf, map, merge, BehaviorSubject, take, ReplaySubject, from, switchMap } from "rxjs";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { DataSource } from "@angular/cdk/collections";
import { TdtDto } from "../../models/tdt-dto.model";

export class TdtListDataSource extends DataSource<TdtDto> {
    //public data!: TdtDto[];
    paginator: MatPaginator | undefined;
    sort!: MatSort;
    get filter(): string { return this.filter$.getValue(); }
    set filter(value: string) { this.filter$.next(value); }
    filter$: BehaviorSubject<string> = new BehaviorSubject<string>('');
    _dataStream = new ReplaySubject<TdtDto[]>();
    constructor(initialData?: TdtDto[]) {
        super();
    this.setData(initialData);
    }
    /**
     * Connect this data source to the table. The table will only update when
     * the returned TdtDto emits new items.
     * @returns A TdtDto of the items to be rendered.
     */
    connect(): Observable<TdtDto[]> {
        if (this.paginator && this.sort) {
            // Combine everything that affects the rendered data into one update
            // stream for the data-table to consume.
            return merge(this._dataStream, this.paginator.page, this.sort.sortChange)
              .pipe(map(res => {
                return this.getPagedData(this.getSortedData(this.getFilteredData(res as TdtDto[])));
              }));
          } else {
            throw Error('Please set the paginator and sort on the data source before connecting.');
          }
     }

    /**
     *  Called when the table is being destroyed. Use this function, to clean up
     * any open connections or free any held resources that were set up during connect.
     */
    disconnect() { }

    private getFilteredData(data: TdtDto[]) {
        return data.filter(d => d.channelName!.toLowerCase().includes(this.filter));
    }

    /**
     * 
     * @param data 
     */
    setData(data: TdtDto[]) {
        this._dataStream.next(data);
      }
   /**
      * Paginate the data (client-side). If you're using server-side pagination,
      * this would be replaced by requesting the appropriate data from the server.
      */
     private getPagedData(data: TdtDto[]): TdtDto[] {
       if (this.paginator) {
         const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
         return data.splice(startIndex, this.paginator.pageSize);
       } else {
         return data;
       }
     }

    /**
     * Sort the data (client-side). If you're using server-side sorting,
     * this would be replaced by requesting the appropriate data from the server.
     */
    private getSortedData(data: TdtDto[]) {
        if (!this.sort.active || this.sort.direction === '') {
            return data;
        }

        return data.sort((a, b) => {
            const isAsc = this.sort.direction === 'asc';
            switch (this.sort.active) {
                case 'channelName': return compare(a.channelName!, b.channelName!, isAsc);
                default: return 0;
            }
        });
    }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

