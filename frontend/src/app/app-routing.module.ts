import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'list-bicycles',
    loadChildren: () => import('./bicycle/list-bicycles/list-bicycles.module').then( m => m.ListBicyclesPageModule)
  },
  {
    path: 'add-bicycle',
    loadChildren: () => import('./bicycle/add-bicycle/add-bicycle.module').then( m => m.AddBicyclePageModule)
  },
  {
    path: 'list-users',
    loadChildren: () => import('./user/list-users/list-users.module').then( m => m.ListUsersPageModule)
  },
  {
    path: 'add-user',
    loadChildren: () => import('./user/add-user/add-user.module').then( m => m.AddUserPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./auth/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
