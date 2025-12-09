import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  // Helper method to get auth headers
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    if (token) {
      return new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
    }
    return new HttpHeaders();
  }

  // GET request
  get(url: string, options: any = {}): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get<any>(`${this.baseUrl}/${url}`, { ...options, headers });
  }

  // POST request
  post(url: string, body: any, options: any = {}): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post<any>(`${this.baseUrl}/${url}`, body, { ...options, headers });
  }

  // PUT request
  put(url: string, body: any, options: any = {}): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put<any>(`${this.baseUrl}/${url}`, body, { ...options, headers });
  }

  // DELETE request
  delete(url: string, options: any = {}): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete<any>(`${this.baseUrl}/${url}`, { ...options, headers });
  }

}
