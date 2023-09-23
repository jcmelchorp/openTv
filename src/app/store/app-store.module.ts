import * as fromEntity from './config/entity-metadata';
import { StoreModule } from "@ngrx/store";
import { EntityDataModule } from "@ngrx/data";

import { EffectsModule } from "@ngrx/effects";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "src/environments/environment";
import { StoreRouterConnectingModule } from "@ngrx/router-store";
import { NgModule } from '@angular/core';
import { ToastrStoreService } from './toastr-store.service';
import { registeredEffects } from './config/registredEffects';
import * as fromRoot from './app.state';
import { storeConfig } from './config/store-config';
import { CustomSerializer } from './router/custom-serializer';
import { routerKey } from './router';

@NgModule({
    declarations: [],
    imports: [
        StoreModule.forRoot(fromRoot.reducers, storeConfig),
        !environment.production
            ? StoreDevtoolsModule.instrument()
            : StoreDevtoolsModule.instrument({
                maxAge: 25,
                logOnly: environment.production,
                features: {
                    pause: false,
                    lock: false,
                    persist: true,
                }
            }),
        StoreRouterConnectingModule.forRoot({
            stateKey: routerKey,
            serializer: CustomSerializer,
        }),
        EffectsModule.forRoot(registeredEffects),
        EntityDataModule.forRoot(fromEntity.entityConfig)
    ],
    providers: [ToastrStoreService],
    exports: [
        StoreModule,
        StoreRouterConnectingModule,
        StoreDevtoolsModule,
        EffectsModule,
        EntityDataModule,
    ]
})
export class AppStoreModule { }