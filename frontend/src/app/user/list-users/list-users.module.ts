import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ListUsersPageRoutingModule } from './list-users-routing.module';
import { ListUsersPage } from './list-users.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListUsersPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ListUsersPage]
})
export class ListUsersPageModule {}
