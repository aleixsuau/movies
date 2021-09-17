import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesListComponent } from 'src/app/features/movies/feature/movies-list/movies-list.component';

const routes: Routes = [
  {
    path: '',
    component: MoviesListComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule { }
