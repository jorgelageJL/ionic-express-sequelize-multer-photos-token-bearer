import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListBicyclesPage } from './list-bicycles.page';

const routes: Routes = [
  {
    path: '',
    component: ListBicyclesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListBicyclesPageRoutingModule {}
