import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  private noAuthRoutes = [
    '/sign-in'
  ];

  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const route = req.url.replace(environment.authBasePath, '');

    if (!this.noAuthRoutes.includes(route)) {

      const authReq = req.clone({
        headers: req.headers.set('Authorization', this.authService.getToken())
      });

      return next.handle(authReq);
    } else {
      return next.handle(req);
    }
  }
}
