import { Injectable } from '@angular/core';
import { environment } from '../admin/components/models/environment';
import { AdminTrainerResponse } from '../admin/components/models/trainerdetail';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private adminTrainerURl=environment.adminTrainer;
  

  private currentUserSubject = new BehaviorSubject<AdminTrainerResponse | null>(null);
  private adminName: string = '';

  constructor(private http: HttpClient, private router: Router) {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const user = JSON.parse(storedUser) as AdminTrainerResponse;
      this.currentUserSubject.next(user);
      this.adminName = user.name;
    }
  }

  isLogged: boolean = false;


 

  login(username: string, password: string): Observable<AdminTrainerResponse | null> {
    return this.http.get<AdminTrainerResponse[]>(
      `${this.adminTrainerURl}?username=${username}&password=${password}`
    ).pipe(
      map(users => {
        console.log(users)
        if (users.length > 0) {

          const user = users[0];
          console.log("1 user",user)

          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          this.adminName = user.name;
          return user;
        }
        return null;
      }),
      catchError(e => {
        console.log('login error:', e);
        return of(null);
      })
    );
  }


  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.adminName = '';
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  getAdminName(): string {
    return this.adminName;
  }

  isAdmin(): boolean {
    return this.currentUserSubject.value?.role.includes('admin') ?? false;
  }

  isTrainer(): boolean {
    return this.currentUserSubject.value?.role.includes('trainer') ?? false;
  }

  getCurrentUser(): AdminTrainerResponse | null {
    return this.currentUserSubject.value;
  }
}
