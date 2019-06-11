import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    private noAuthRoutes = [
        '/oauth/token',
        '/sign-in'
    ];

    private noAuthDomains = [
        'localhost:4280'
    ];

    constructor(private authService: AuthService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!this.isRouteWithoutAuth(req.url)) {
            const authReq = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${this.authService.getToken()}`)
            });

            return next.handle(authReq);
        } else {
            return next.handle(req);
        }
    }

    isRouteWithoutAuth(route: string): boolean {
        return this.noAuthRoutes.filter(noAuthRoute => route.includes(noAuthRoute)).length > 0
            || this.noAuthDomains.filter(noAuthDomain => route.includes(noAuthDomain)).length > 0;
    }

}
