import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service'; 
import { ActivatedRoute } from '@angular/router';

import { Router } from '@angular/router';
import { Admin } from '../admin.interface'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.loginForm = this.fb.group({
      adminName: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    
    this.route.queryParams.subscribe(params => {
      if (params['logout'] === 'true') {
        this.authService.logout();
       
      }
    });
  }
  onSubmit() {
    if (this.loginForm.valid) {
      const { adminName, password } = this.loginForm.value;

      const user = this.authService.login(adminName, password);  
      if (user) {
      
        this.router.navigate(['/admin']);
      } else {
        alert('Invalid login credentials!');
      }
    }
  }
}
