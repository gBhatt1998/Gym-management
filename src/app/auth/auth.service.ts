import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
   data = [
    {
      id: '1',
      name: 'admin 1',
      adminName: 'ad',
      password: 'admin1'
    },
    {
      id: '2',
      name: 'admin 2',
      adminName: 'admin2',
      password: 'admin2password'
    },
    {
      id: '3',
      name: 'admin 3',
      adminName: 'admin3',
      password: 'admin3pass'
    }
  ];
  isLogged:Boolean=false;
  constructor() {
    

   }

   login(adminName:String,password:String){
    let admin=this.data.find((u)=>u.adminName===adminName && u.password===password );
    console.log("auth service working")
    if(admin===undefined)
      this.isLogged=false;
    else
    console.log("refresh")
    localStorage.setItem('admin', JSON.stringify(admin));
    this.isLogged=true;
  return admin;
  }

  logout(){
    localStorage.removeItem('admin');
    this.isLogged=false;
  }

  //method to be used by authgurad
  isAuthenticated(){
    return !!localStorage.getItem('admin');
  }
}
