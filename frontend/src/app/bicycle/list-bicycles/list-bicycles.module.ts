import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ListBicyclesPageRoutingModule } from './list-bicycles-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListBicyclesPage } from './list-bicycles.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListBicyclesPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ListBicyclesPage]
})
export class ListBicyclesPageModule {}
