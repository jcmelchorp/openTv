import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './core/layout';
import { IptvResolver } from './store/resolvers/iptv.resolver';
import { PlayerComponent, SettingsComponent, WellcomeComponent } from './core/components';
import { SurferSeedDbComponent } from './core/containers';

const routes: Routes = [
  {
    path: '', component: LayoutComponent, resolve: { cycles: IptvResolver }, children: [
      {
        path: '',
        component: WellcomeComponent,
      },
      {
        path: 'settings',
        component: SettingsComponent,
      },
      {
        path: ':id',
        component: PlayerComponent,
      },
      {
        path: 'seed',
        component: SurferSeedDbComponent,
      }

    ]
  },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
