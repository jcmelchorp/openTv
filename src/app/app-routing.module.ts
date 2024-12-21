import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './core/layout';
import { SettingsComponent, WellcomeComponent } from './core/components';
import { SurferSeedDbComponent } from './iptvs/containers';
import { NotFoundComponent, AboutComponent } from './shared/components';

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      {
        path: '',
        component: WellcomeComponent,
      },
      {
        path: 'about',
        component: AboutComponent,
      },
      { path: 'iptvs', loadChildren: () => import('./iptvs/iptvs.module').then(m => m.IptvsModule) },
      { path: 'tdts', loadChildren: () => import('./tdts/tdts.module').then(m => m.TdtsModule) },
      {
        path: 'settings',
        component: SettingsComponent,
      },
      // {
      //   path: 'seed',
      //   component: SurferSeedDbComponent,
      // },
      {
        path: '404',
        component: NotFoundComponent,
      },
    ]
  },
  { path: '**', redirectTo: '/404', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
