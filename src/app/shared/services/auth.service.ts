import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isUserSignedIn$ = new BehaviorSubject<boolean>(this.isSignedIn());

  constructor(private http: HttpClient) {
  }

  signUp(username: string, password: string): Observable<any> {
    return this.http.post(`${environment.authBasePath}/sign-up`, {
      username,
      password
    });
  }

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
        this.isUserSignedIn$.next(true);
      })
    );
  }

  signOut(): void {
    localStorage.removeItem('token');
    this.isUserSignedIn$.next(false);
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
