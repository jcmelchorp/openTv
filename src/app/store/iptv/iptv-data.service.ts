import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator, QueryParams } from '@ngrx/data';
import { Update } from '@ngrx/entity';
import { Observable, from } from 'rxjs';
import * as fromIptv from '.';
import { IptvDto } from 'src/app/core/models/iptv-dto.model';
import { IptvDtoService } from 'src/app/core/services';

@Injectable()
export class IptvDataService extends DefaultDataService<IptvDto> {
    constructor(
        http: HttpClient,
        httpUrlGenerator: HttpUrlGenerator,
        private iptvService: IptvDtoService
    ) {
        super(fromIptv.entityCollectionName, http, httpUrlGenerator);
    }
    override getAll(): Observable<IptvDto[]> {
        return from(this.iptvService.list());
    }
    // override getWithQuery(queryParams: HttpParams): Observable<IptvDto[]> {
    //     return from(this.iptvService.getWithQuery(queryParams));
    // }
    // update(user: Update<IptvDto>): Observable<IptvDto> {
    //     return from(this.accountsDomainService.updateUser(user.changes));
    // }
    // getByKey(userKey: string): Observable<IptvDto> {
    //     return from(this.accountsDomainService.getAccountsDomain(userKey));
    // }
    // add(user: Partial<IptvDto>) {
    //     return from(this.accountsDomainService.addUser(user));
    // }
}