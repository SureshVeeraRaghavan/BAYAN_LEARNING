import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpService } from '../../services/api-service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Auth } from '../auth';

interface RegisterResponse {
  status: number;
  message: string;
  data: {
    user: string;
    token: string;
  };
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule, RouterModule],
  templateUrl: './register.html',
  styleUrls: ['./register.scss'],
})
export class Register {
  loading: boolean = false;
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  message: string = '';
  selectedRole: string = '';

  constructor(
    private httpService: HttpService,
    private router: Router,
    private authService: Auth
  ) {}

  onRegister() {
    if (!this.username || !this.email || !this.password || !this.confirmPassword||!this.selectedRole) {
      this.message = 'Please fill in all fields';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.message = 'Passwords do not match';
      return;
    }

    if (this.password.length < 6) {
      this.message = 'Password must be at least 6 characters';
      return;
    }
    if(this.selectedRole)
    {
      console.log("selected "+this.selectedRole)
    }
  
    this.loading = true;

    const body = {
      username: this.username,
      useremail: this.email,
      password: this.password,
      role:this.selectedRole
    };

    this.httpService.post('users/userdetails', body).subscribe({
      next: (res: any) => {
        this.loading = false;
        this.message = 'Registration Successful! Redirecting to login...';
        setTimeout(() => this.router.navigate(['/'])), 2000;
      },
      error: (err: any) => {
        this.loading = false;
        console.error('Registration error:', err);

        // Handle different error responses
        if (err.status === 409) {
          this.message = 'User with this email already exists';
        } else if (err.status === 400) {
          this.message = 'Invalid input. Please check your details';
        } else if (err.status === 0) {
          this.message = 'Unable to connect to server';
        } else if (err.error && err.error.message) {
          this.message = err.error.message;
        } else {
          this.message = 'Registration failed. Please try again';
        }
      },
    });
  }
}