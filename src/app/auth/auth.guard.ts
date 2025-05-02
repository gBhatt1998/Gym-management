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
    const user = this.authService.getCurrentUser();

    if (!user) {
     
      this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }

    
    const requiredRole = next.data['Role'];
    if (requiredRole) {
      if (requiredRole === 'admin' && !this.authService.isAdmin()) {
        this.router.navigate(['/unauthorized']);
        return false;
      } else if (requiredRole === 'trainer' && !this.authService.isTrainer()) {
        this.router.navigate(['/unauthorized']);
        return false;
      }
    }

    return true;
  }
}
