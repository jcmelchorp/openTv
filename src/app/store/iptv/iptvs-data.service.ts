import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator, QueryParams } from '@ngrx/data';
import { Update } from '@ngrx/entity';
import { Observable, from } from 'rxjs';
import * as fromIptv from '.';
import { IptvDtoService } from 'src/app/iptvs/services';
import { IptvDto } from 'src/app/iptvs/models/iptv-dto.model';
import { ApiService } from 'src/app/shared/services';

@Injectable()
export class IptvsDataService extends DefaultDataService<IptvDto> {
    constructor(
        http: HttpClient,
        httpUrlGenerator: HttpUrlGenerator,
        private iptvService: ApiService
    ) {
        super(fromIptv.entityCollectionName, http, httpUrlGenerator);
    }
    override getAll(): Observable<IptvDto[]> {
        return from(this.iptvService.list());
    }
    // override getWithQuery(queryParams: QueryParams): Observable<IptvDto[]> {
    //     return from(this.iptvService.getWithQuery(queryParams));
    // }
}