import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../components/models/environment';
import { User } from '../components/models/user.model';
@Injectable({
  providedIn: 'root'
})
export class CreateUpateUserService {
 
   userUrl=environment.userUrl;
  
  constructor(private http: HttpClient) { }

  postRegistration(userDetailsObj: User) {
    return this.http.post<User>(`${this.userUrl}`, userDetailsObj)
  }

  getRegisteredUser() {
    return this.http.get<User[]>(`${this.userUrl}`)
  }

}
