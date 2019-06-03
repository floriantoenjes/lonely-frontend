import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { URLSearchParams } from 'url';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signIn(username: string, password: string): Observable<any> {
    const params = new URLSearchParams();

    params.append('username', username);
    params.append('password', password);
    params.append('grant_type', 'password');

    const headers = new HttpHeaders()
    .set('Content-type', 'application/x-www-form-urlencoded; charset=utf-8')
    .set('Authorization', 'Basic ' + btoa('springboot:buch'));

    this.http.post(`${environment.basePath}/oauth/token`, params.toString(), {
      headers,
      observe: 'response'
    });

    return of();
  }
}
