import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './core/layout';
import { SettingsComponent, WellcomeComponent } from './core/components';
import { SurferSeedDbComponent } from './iptvs/containers';

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      {
        path: '',
        component: WellcomeComponent,
      },
      { path: 'iptvs', loadChildren: () => import('./iptvs/iptvs.module').then(m => m.IptvsModule) },
      {
        path: 'settings',
        component: SettingsComponent,
      },
      {
        path: 'seed',
        component: SurferSeedDbComponent,
      }

    ]
  },
  { path: '**', redirectTo: '/iptvs', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
