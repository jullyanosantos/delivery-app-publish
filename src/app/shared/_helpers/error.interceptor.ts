import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from '../_services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private authenticationService: AuthenticationService,
        private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            debugger
            if ([401, 403].includes(err.status) && this.authenticationService.currentUserValue) {
                // auto logout if 401 response returned from api

                alert(this.router.routerState.snapshot.url);
                
                this.authenticationService.logout(this.router.routerState.snapshot.url);
            }

            const error = err.error.message || err.message || err.statusText;
            return throwError(error);
        }))
    }
}