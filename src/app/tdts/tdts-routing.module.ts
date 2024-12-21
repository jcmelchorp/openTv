import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SurferTdtComponent } from "./containers";
import { TdtsResolver } from "./resolvers/tdts.resolver";
import { TdtResolver } from "./resolvers/tdt.resolver";
import { TdtPlayerComponent } from "./components";

const routes: Routes = [
  {
    path: '',
    component: SurferTdtComponent,
    // loadComponent: () => import('./containers/surfer/surfer.component').then(m => m.SurferComponent),
    resolve: { tdts: TdtsResolver }, children: [
      {
        path: ':id', component: TdtPlayerComponent,
        resolve: { tdt: TdtResolver }

      }]
  },
  { path: '**', redirectTo: '/404', pathMatch: 'full' }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [TdtResolver, TdtsResolver]
})
export class TdtRoutingModule { }