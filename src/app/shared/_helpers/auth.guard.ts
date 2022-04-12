import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SidenavService } from '../componentes/layout/sidebar/sidenav.service';
import { AuthenticationService } from '../_services/authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private _sidebarService: SidenavService,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        
        const currentUser = this.authenticationService.currentUserValue;
        var isLogged = this.authenticationService.isLogged();
        if (currentUser && isLogged) {
            // logged in so return true
            this._sidebarService.showSideBar.emit(true);
            return true;
        }

        // not logged in so redirect to login page with the return url
        debugger
        var stateUrl = state.url;
             
        // alert(stateUrl);
        this.authenticationService.logout(stateUrl);
        // this.router.navigate(['/account/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}