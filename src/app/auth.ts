import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
interface User {
  id: string;
  username: string;
  useremail: string;
  role: string;
}

interface LoginResponse {
  status: number;
  message: string;
  data: {
    token: string;
    id: string;
    user: string;
    role: string;
    useremail: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private userKey = 'currentUser';
  private tokenKey = 'authToken';
  private roleKey = 'role';
  private idKey = 'userId';
  private emailKey = 'useremail';
  private apiUrl = 'http://localhost:8080';
  constructor(private http: HttpClient) {}


getUserId(): string | null {
  if (typeof window !== 'undefined' && window.localStorage) {
    return localStorage.getItem(this.idKey);
  }
  return null;
}
getrole() {
  if (typeof window !== 'undefined' && window.localStorage) {
    return localStorage.getItem("role");
  }
  return null; 
}

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/users/login`, { username, password })
      .pipe(
        tap((res) => {
          console.log('Login response:', res);
          debugger
          if (res && res.data) {
            console.log('Login data:', res.data);

            if (res.data.token) {
              localStorage.setItem(this.tokenKey, res.data.token);
          
            }
            if (res.data.id) {
              localStorage.setItem(this.idKey, res.data.id);
            }
            if (res.data.role) {
              localStorage.setItem(this.roleKey, res.data.role);
            }
            if (res.data.user) {
              localStorage.setItem(this.userKey, res.data.user);
            }
            if (res.data.useremail) {
              localStorage.setItem(this.emailKey, res.data.useremail);
            }
          }
        })
      );
  }

  logout(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem(this.tokenKey);
      localStorage.removeItem(this.userKey);
      localStorage.removeItem(this.roleKey);
      localStorage.removeItem(this.idKey);
      localStorage.removeItem(this.emailKey);
    }
  }

  getToken(): string | null{
    if (typeof window !== 'undefined' && window.localStorage) {
      var token=localStorage.getItem(this.tokenKey)
      return localStorage.getItem(this.tokenKey);
    }
    return null;
  }

  getCurrentUser(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const user = localStorage.getItem(this.userKey);
      // return user ? JSON.parse(user) : null;
    }
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

    getAuthHeaders(): HttpHeaders {
      return new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`,
      });
    }
}
