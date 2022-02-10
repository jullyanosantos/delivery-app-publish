import { AuthenticationService } from '../_services/authentication.service';

export function appInitializer(authenticationService: AuthenticationService) {

    app.ui.setBusy();

    return () => new Promise((resolve, reject)=> {

        app.ui.clearBusy();
        
        // attempt to refresh token on app start up to auto authenticate
        authenticationService.refreshToken()
            .subscribe()
            .add(resolve);
    });
}