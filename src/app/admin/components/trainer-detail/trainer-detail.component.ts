import { Component } from '@angular/core';
import { trainerDetail } from '../models/trainerdetail';
import { TrainerdetailsService } from '../../services/trainerdetails.service';

@Component({
  selector: 'app-trainer-detail',
  templateUrl: './trainer-detail.component.html',
  styleUrls: ['./trainer-detail.component.css']
})
export class TrainerDetailComponent {
  tableData :trainerDetail[]=[];

  columnHeader = {
    id: 'ID',
    createdAt: 'Created At',
    firstname: 'First Name',
    lastname: 'Last Name',
    age: 'Age',
    experince: 'Experience'
  };

  constructor( private trainerService:TrainerdetailsService){}

  ngOnInit(): void {
    this.getTrainerDetails();
  }
  getTrainerDetails(){
    this.trainerService.getTrainerDetails().subscribe({
      next:(res)=>{
       // console.log(res);
        this.tableData =res;
        console.log(this.tableData);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
  
}
