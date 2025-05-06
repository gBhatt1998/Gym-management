import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { User } from '../models/user.model';
import { CreateUpateUserService } from '../../services/create-upate-user.service';
import { trainerDetail } from '../models/trainerdetail';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  showUser = true; 

  toggleView(view: 'user' | 'trainer') {
    this.showUser = view === 'user';
  }
}
