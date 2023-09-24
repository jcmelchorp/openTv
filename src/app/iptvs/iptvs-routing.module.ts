import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SurferComponent } from "./containers";
import { PlayerComponent } from "./components";
import { IptvsResolver } from "./resolvers/iptvs.resolver";
import { IptvResolver } from "./resolvers/iptv.resolver";
import { Iptv } from "./models/iptv.model";

const routes: Routes = [
    {
        path: '', component: SurferComponent, resolve: { iptvs: IptvsResolver }, children: [
            {
                path: ':id', component: PlayerComponent,
                resolve: { iptv: IptvResolver }

            }]
    },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [IptvsResolver, IptvResolver]
})
export class IptvRoutingModule { }