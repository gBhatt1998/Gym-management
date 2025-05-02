import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../admin/components/models/environment';
import { AdminTrainerResponse } from '../admin/components/models/trainerdetail';


export interface SafeUser {
  id: number;
  name: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private adminTrainerURl = environment.adminTrainer;

  private currentUserSubject = new BehaviorSubject<SafeUser | null>(null);
  private adminName: string = '';

  constructor(private http: HttpClient, private router: Router) {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const user = JSON.parse(storedUser) as SafeUser;
      this.currentUserSubject.next(user);
      this.adminName = user.name;
    }
  }

  login(username: string, password: string): Observable<SafeUser | null> {
    return this.http.get<SafeUser[]>(
      `${this.adminTrainerURl}?username=${username}&password=${password}`
    ).pipe(
      map(users => {
        if (users.length > 0) {
          const user = users[0];

          const safeUser: SafeUser = {
            id: user.id,
            name: user.name,
            role: user.role.toLowerCase()
          };

          localStorage.setItem('currentUser', JSON.stringify(safeUser));
          this.currentUserSubject.next(safeUser);
          this.adminName = safeUser.name;

          return safeUser;
        }
        return null;
      }),
      catchError(e => {
        console.error('Login error:', e);
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
    return this.currentUserSubject.value !== null;
  }

  getCurrentUser(): SafeUser | null {
    return this.currentUserSubject.value;
  }

  getAdminName(): string {
    return this.adminName;
  }

  getUserRole(): string | null {
     return this.currentUserSubject.value?.role ?? null;
  }

  isAdmin(): boolean {
  return this.getUserRole() === 'admin';
  }

  isTrainer(): boolean {
    return this.getUserRole() === 'trainer';
  }
}
