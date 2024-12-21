import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DefaultDataService, HttpUrlGenerator } from "@ngrx/data";
import { from, Observable } from "rxjs";
import { TdtDto } from "src/app/tdts/models/tdt-dto.model";
import * as fromTdt from '.';
import { TdtService } from 'src/app/shared/services';


@Injectable()
export class TdtsDataService extends DefaultDataService<TdtDto> {
    constructor(
        http: HttpClient,
        httpUrlGenerator: HttpUrlGenerator,
        private TdtService: TdtService
    ) {
        super(fromTdt.entityCollectionName, http, httpUrlGenerator);
    }
    override getAll(): Observable<TdtDto[]> {
        return from(this.TdtService.list());
    }
    // override getWithQuery(queryParams: QueryParams): Observable<TdtDto[]> {
    //     return from(this.TdtService.getWithQuery(queryParams));
    // }
}