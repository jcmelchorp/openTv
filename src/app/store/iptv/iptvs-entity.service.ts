import * as fromIptv from '.';
import { Injectable } from '@angular/core';
import {
    EntityCollectionServiceBase,
    EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { IptvDto } from 'src/app/iptvs/models/iptv-dto.model';

@Injectable()
export class IptvsEntityService extends EntityCollectionServiceBase<IptvDto> {
    constructor(
        readonly serviceElementsFactory: EntityCollectionServiceElementsFactory
    ) {
        super(fromIptv.entityCollectionName, serviceElementsFactory);
    }
}