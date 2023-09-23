import * as fromIptv from '.';
import { Injectable } from '@angular/core';
import {
    EntityCollectionServiceBase,
    EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { IptvDto } from 'src/app/core/models/iptv-dto.model';

@Injectable()
export class IptvEntityService extends EntityCollectionServiceBase<IptvDto> {
    constructor(
        readonly serviceElementsFactory: EntityCollectionServiceElementsFactory
    ) {
        super(fromIptv.entityCollectionName, serviceElementsFactory);
    }
}