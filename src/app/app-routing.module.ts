import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MovieComponent } from './components/movie/movie.component';
import { TvComponent } from './components/tv/tv.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'movie/:id', component: MovieComponent },
  { path: 'tv/:id', component: TvComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
