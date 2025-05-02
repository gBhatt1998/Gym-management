import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreateUpdateUserComponent } from './components/create-update-user/create-update-user.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { TrainerDetailComponent } from './components/trainer-detail/trainer-detail.component';
import { AuthGuard } from '../auth/auth.guard';
const routes: Routes = [
  { path: '', component: DashboardComponent },  // Direct path to DashboardComponent
  { path: 'manageuser', component: CreateUpdateUserComponent ,canActivate:[AuthGuard],},
  {path:'usertable',component:UserManagementComponent},  // Path for user management
  
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
