import { createAction, props } from '@ngrx/store';
import { IptvDto } from 'src/app/core/models/iptv-dto.model';

export const loadApp = createAction('[App] Load App');

export const loadAppSuccess = createAction('[App] Load App Success');

export const loadAppFail = createAction(
    '[App] Load App Fail',
    props<{ error: any }>()
);
export const localStoreIptv = createAction(
    '[App] Store in local User',
    props<{ iptv: IptvDto }>()
);