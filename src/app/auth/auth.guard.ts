import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',  
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.authService.isAuthenticated()) {
      console.log(" auth guard logout")
      this.router.navigate(['login']);
      return false;
    }


    const Role = next.data['Role'];
    if (Role) {
      const hasRole = Role === 'admin' ? this.authService.isAdmin():this.authService.isTrainer();
      
      
    }
    console.log("auth guard working")
    return true;
  }

  
}


