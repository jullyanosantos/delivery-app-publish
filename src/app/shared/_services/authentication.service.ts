import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { User } from '../_models/user';
import * as moment from 'moment';
import * as jwtDecode from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(
        private http: HttpClient,
        private router: Router,) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { username, password })
            .pipe(map(result => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                // localStorage.setItem('currentUser', JSON.stringify(result));

                debugger
                this.setSession(result);
                this.currentUserSubject.next(result);
                this.startRefreshTokenTimer();
                return result;
            }));
    }

    getAccessToken() {
        return localStorage.getItem('token');
    }

    getExpiration() {
        const expiration = localStorage.getItem('expiration');
        const expiresAt = JSON.parse(expiration);

        var _moment = moment(expiresAt);

        return _moment
    }

    hasExpiredToken() {
        return !moment().isBefore(this.getExpiration());
    }

    private setSession(result: any) {


        const token = result.accessToken;
        const payload = <JWTPayload>jwtDecode.default(token);
        const expiresAt = moment.unix(payload.exp);

        // localStorage.setItem("refreshToken", refreshToken);

        localStorage.setItem('currentUser', JSON.stringify(result));
        localStorage.setItem('token', token);
        localStorage.setItem('expiration', JSON.stringify(expiresAt.valueOf()));
    }

    refreshToken() {

        return this.http.post<any>(`${environment.apiUrl}/users/refresh-token`, {}, { withCredentials: true })
            .pipe(map((user) => {
                this.currentUserSubject.next(user);
                this.startRefreshTokenTimer();
                return user;
            }));
    }

    private refreshTokenTimeout;

    private startRefreshTokenTimer() {

        // parse json object from base64 encoded jwt token
        const jwtToken = JSON.parse(atob(this.currentUserValue.accessToken.split('.')[1]));

        // set a timeout to refresh the token a minute before it expires
        const expires = new Date(jwtToken.exp * 1000);
        const timeout = expires.getTime() - Date.now() - (60 * 1000);
        this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
    }

    private stopRefreshTokenTimer() {
        clearTimeout(this.refreshTokenTimeout);
    }

    isLogged(): boolean {

        var isBefore = !this.hasExpiredToken() && localStorage.getItem('currentUser') != null && this.currentUserValue != null;
        return isBefore;
    }

    logout(stateUrl?: string): void {

        this.http.post<any>(`${environment.apiUrl}/users/revoke-token`, {}, { withCredentials: true }).subscribe();
        this.stopRefreshTokenTimer();
        this.resetSession();

        if (stateUrl)
            this.router.navigate(['/account/login'], { queryParams: { returnUrl: stateUrl } });
        else
            this.router.navigate(['/account/login']);
    }

    resetSession() {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
        localStorage.removeItem('expiration');
        // localStorage.removeItem('refreshToken');
        this.currentUserSubject.next(null);
        // this.stopRefreshTokenTimer();
    }
}

interface JWTPayload {
    user_id: number;
    username: string;
    email: string;
    exp: number;
}