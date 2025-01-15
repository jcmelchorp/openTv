import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MovieResolver } from "./resolvers/movie.resolver";
import { MoviesResolver } from "./resolvers/movies.resolver";
import { MoviePlayerComponent, VjsPlayerComponent } from "./components";
import { SurferMoviesComponent } from "./containers";


const routes: Routes = [
  {
    path: '',
    component: SurferMoviesComponent,
    // loadComponent: () => import('./containers/surfer/surfer.component').then(m => m.SurferComponent),
    resolve: { movies: MoviesResolver }, children: [
      {
        path: ':id', component: MoviePlayerComponent,
        resolve: { movie: MovieResolver }

      }]
  },
  { path: '**', redirectTo: '/404', pathMatch: 'full' }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [MovieResolver, MoviesResolver]
})
export class MovieRoutingModule { }