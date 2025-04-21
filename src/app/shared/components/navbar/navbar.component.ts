import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isLoggedIn = true; // This would be based on your actual authentication logic

  constructor(private router: Router) {}

  logout() {
    // Perform logout logic (clear authentication token, user data, etc.)
    console.log('Logged out');
    this.isLoggedIn = false; // Update login state
    
    // Redirect user to login page after logging out
    this.router.navigate(['/login']);
  }
}
