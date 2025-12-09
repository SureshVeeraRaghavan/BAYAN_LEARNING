import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpService } from '../../services/api-service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Auth } from '../auth';
import { constants } from 'buffer';

interface User {
  id: string;
  token: string;
  useremail: string;
  role: string;
}
interface LoginResponse {
  status: number;
  message: string;

  data: {
    role: any;
    user: string;
    token: string;
  };
}
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class Login {
  showToast = false;
  loading: boolean = false;
  private userKey = 'currentUser';
  private tokenKey = 'authToken';
  private roleKey = 'userRole';
  private idKey = 'userId';
  username: string = '';
  password: string = '';
  message: string = '';

  constructor(
    private httpService: HttpService,
    private router: Router,
    private authservice: Auth,
    private route:ActivatedRoute

  ) {}
    ngOnInit():void{
      if(this.authservice.isAuthenticated())
      {
        this.route.queryParams.subscribe((params:any)=>{
          const redirecturl=params['returnUrl']
          if(redirecturl)
          {
            this.router.navigate([redirecturl], { replaceUrl: true });
          }
        })
        const currenturl=this.router.url;
       if(currenturl=='/'||currenturl=='/login')
       {
         this.router.navigate(['/app/home'], { replaceUrl: true });
       }
        
      }
    }
  onLogin() {
    if (!this.username || !this.password) {
      this.message = 'Please enter both email and password';
      return;
    }

    this.loading = true;
    console.log(this.username);

    const body = { username: this.username, password: this.password };

    this.authservice.login(this.username, this.password).subscribe({
      next: (res) => {
        this.loading = false;
        this.message = 'Login Successful';
        console.log('Login successful', res);

        setTimeout(() => this.router.navigate(['/app']), 800);
      },
      error: (err) => {
        this.loading = false;
        console.error('Login error:', err);

        // Handle different error responses
        if (err.status === 401) {
          this.message = 'Invalid username or password';
        } else if (err.status === 0) {
          this.message = 'Unable to connect to server';
        } else if (err.error && err.error.message) {
          this.message = err.error.message;
        } else {
          this.message = 'Login failed. Please try again';
        }
      },
    });

    //   this.httpService.post('users/login', this.username).subscribe({
    //     next: (res: any) => {
    //         localStorage.setItem(this.tokenKey, res.data.token);
    //         localStorage.setItem(this.userKey, JSON.stringify(res.data.user));
    //          localStorage.setItem(this.roleKey, JSON.stringify(res.data.role));
    //           localStorage.setItem(this.idKey, JSON.stringify(res.data.id));
    //       console.log('API Response:', res);
    //       console.log(res.data.id)

    //       if (!res) {
    //         this.message = 'Invalid User';
    //       } else {

    //         this.message = 'Login Successful';

    //         if (res.token) {
    //           localStorage.setItem('token', res.token);
    //         }

    //         setTimeout(() => this.router.navigate(['/app']), 1000);
    //       }
    //     },
    //     error: (err: any) => {
    //       console.error(err);
    //       this.message = 'Invalid User';
    //     },
    //   });
    // }
  }
}
