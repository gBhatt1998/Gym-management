import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canActivate:[AuthGuard] },
  {
    path: 'auth',loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  { path: 'trainer', loadChildren: () => import('./trainer/trainer.module').then(m => m.TrainerModule),canActivate:[AuthGuard],data: { 
    Role: 'trainer' 
  } }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
