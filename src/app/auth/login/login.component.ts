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
  returnUrl: string = '';

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
      this.returnUrl = params['returnUrl'] || '';
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
          this.loading = false;

          if (user) {

            let redirectUrl = this.returnUrl;
            if (!redirectUrl) {
              if (this.authService.isAdmin()) {
                redirectUrl = '/admin';
              } else if (this.authService.isTrainer()) {
                redirectUrl = '/trainer';
              } else {
                redirectUrl = '/unauthorized'; // unknown role
              }
            }

            this.router.navigateByUrl(redirectUrl);
          } else {
            this.errorMessage = 'Invalid username or password';
          }
        },
        error: (err) => {
          this.loading = false;
          this.errorMessage = 'Login failed. Please try again.';
          console.error('Login error:', err);
        }
      });
    }
  }
}