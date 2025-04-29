import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  
  isLoggedIn: boolean = false;
  adminName: string = '';
  title: string = 'Gym Fit';

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.update();
  }

  update() {
    this.isLoggedIn = this.authService.isAuthenticated();
    if (this.isLoggedIn) {
      
      this.adminName = this.authService.getAdminName();
      this.title = 'Admin Panel';
    } else {
      this.adminName = '';
      this.title = 'Gym Fit';
    }
  }

  logout() {
    this.authService.logout();
    this.update();
    this.router.navigate(['/auth/login']); 
  }
}
