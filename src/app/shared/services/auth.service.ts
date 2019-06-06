import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signIn(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + btoa('springboot:buch')
    });

    const credentials = `grant_type=password&username=${username}&password=${password}`;

    return this.http.post(`${environment.authBasePath}/oauth/token`, credentials, {
      headers,
      observe: 'response'
    }).pipe(
      tap(response => {
        const jwt = response.body.access_token;
        this.setToken(jwt);
      })
    );
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  isSignedIn(): boolean {
    return !!this.getToken();
  }
}
