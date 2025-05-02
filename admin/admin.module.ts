import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { TrainerDetailComponent } from './components/trainer-detail/trainer-detail.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { CreateUpdateUserComponent } from 'src/app/admin/components/create-update-user/create-update-user.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSortModule} from '@angular/material/sort';
import { GenericTableComponent } from './components/generic-table/generic-table.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    DashboardComponent,
    UserManagementComponent,
    TrainerDetailComponent,
    CreateUpdateUserComponent,
    GenericTableComponent,
    ScheduleComponent,
  ],

  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    RouterModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    FormsModule
  ],
  exports: [ScheduleComponent]
  
})
export class AdminModule { }
