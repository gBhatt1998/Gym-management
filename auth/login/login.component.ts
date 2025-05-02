import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
   loading = false;
  errorMessage: string | null = null;
  returnUrl: string = '/admin'; 

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]], 
      password: ['', Validators.required],
    });

 
    this.route.queryParams.subscribe(params => {
      this.returnUrl = params['returnUrl'] || '/admin';
      
      if (params['logout'] === 'true') {
        this.authService.logout();
      }
    });
  } 

  onSubmit() {
    if (this.loginForm.valid) {
      this.loading = true;
      this.errorMessage = null;
      
      const { username, password } = this.loginForm.value;

      this.authService.login(username, password).subscribe({
        next: (user) => {
          if (user) {
            console.log("login",user)
            let redirectUrl = this.returnUrl;
            
            if (!this.returnUrl || this.returnUrl === '/admin') {
              redirectUrl = this.authService.isAdmin() ? '/admin' : '/trainer';
            }

            this.router.navigateByUrl(redirectUrl);
          } 
          
        },
        error: (err) => {
          
          console.error('login error:', err);
        }
      });
    }
  }
}