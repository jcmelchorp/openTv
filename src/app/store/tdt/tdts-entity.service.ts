import * as fromTdt from '.';
import { Injectable } from '@angular/core';
import {
    EntityCollectionServiceBase,
    EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { TdtDto } from 'src/app/tdts/models/tdt-dto.model';

@Injectable()
export class TdtsEntityService extends EntityCollectionServiceBase<TdtDto> {
    constructor(
        readonly serviceElementsFactory: EntityCollectionServiceElementsFactory
    ) {
        super(fromTdt.entityCollectionName, serviceElementsFactory);
    }
}