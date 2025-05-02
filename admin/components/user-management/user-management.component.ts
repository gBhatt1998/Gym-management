import { Component } from '@angular/core';
import { CreateUpateUserService } from '../../services/create-upate-user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent {
  tableData :User[]=[];

  columnHeader = {
    id: 'ID',
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'Email',
    mobile: 'Mobile',
    bmiResult: 'BMI Result',
    gender: 'Gender',
    package: 'Package',
    enquiryDate: 'Enquiry Date' 
  };
     constructor(private userService:CreateUpateUserService){}


     ngOnInit(){
      this.getUsers();
     }


      getUsers(){
         this.userService.getRegisteredUser().subscribe({
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
