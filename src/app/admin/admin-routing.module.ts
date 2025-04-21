import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreateUpdateUserComponent } from './components/create-update-user/create-update-user.component';
const routes: Routes = [
  { path: '', component: DashboardComponent },  // Direct path to DashboardComponent
  { path: 'manageuser', component: CreateUpdateUserComponent },  // Path for user management
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
