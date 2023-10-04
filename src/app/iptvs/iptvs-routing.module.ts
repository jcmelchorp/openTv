import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SurferComponent } from "./containers";
import { PlayerComponent } from "./components";
import { IptvResolver } from "./resolvers/iptv.resolver";
import { Iptv } from "./models/iptv.model";
import { IptvsResolver } from "./resolvers/iptvs.resolver";

const routes: Routes = [
    {
        path: '',
        component: SurferComponent,
        // loadComponent: () => import('./containers/surfer/surfer.component').then(m => m.SurferComponent),
        resolve: { iptvs: IptvsResolver }, children: [
            {
                path: ':id', component: PlayerComponent,
                resolve: { iptv: IptvResolver }

            }]
    },
    { path: '**', redirectTo: '/404', pathMatch: 'full' }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [IptvResolver, IptvsResolver]
})
export class IptvRoutingModule { }