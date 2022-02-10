import { Injectable, Injector } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { ConfigService } from '../../shared/utils/config/config.service';
import { User } from '../_models/user';
import { Pedido } from '../_models/pedidos/pedido';
import * as moment from 'moment';

// array in local storage for users
const usersKey = 'angular-10-jwt-refresh-token-users';
const users = JSON.parse(localStorage.getItem(usersKey)) || [];
let orders: Pedido[] = [];

if (!users.length) {

    var user: User = { id: 1, username: 'admin@admin.com.br', password: '123', firstName: 'Admin', lastName: 'User', refreshTokens: [] };
    users.push(user);
}

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

    constructor(
        private injector: Injector,
        private configService: ConfigService) {

        orders = [
            {
                "id": 1,
                "descricao": "Hamburguer com Fritas",
                "valor": 36.00,
                "endereco": "Rua teste, 23",
                "data": moment(),
                "status": 1,
                "items": []
            },
            {
                "id": 2,
                "descricao": "Fritas",
                "valor": 20,
                "endereco": "Rua teste, 333",
                "data": moment(),
                "status": 1,
                "items": []
            },
            {
                "id": 3,
                "descricao": "Hamburguer com Fritas",
                "valor": 36.00,
                "endereco": "Rua teste, 23",
                "data": moment(),
                "status": 2,
                "items": []
            },
            {
                "id": 4,
                "descricao": "Hamburguer com Fritas",
                "valor": 36.00,
                "endereco": "Rua teste, 23",
                "data": moment(),
                "status": 4,
                "items": []
            },
            {
                "id": 5,
                "descricao": "Hamburguer com Fritas",
                "valor": 36.00,
                "endereco": "Rua teste, 23",
                "data": moment(),
                "status": 3,
                "items": []
            }
        ];
        // this.loadUsers();
    }

    async loadUsers() {
        debugger
        // this.users = await this.configService.get("users");
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        // wrap in delayed observable to simulate server api call
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(delay(800))
            .pipe(dematerialize());

        function handleRoute() {

            debugger
            switch (true) {
                case url.endsWith('/users/authenticate') && method === 'POST':
                    return authenticate();
                case url.endsWith('/users/register') && method === 'POST':
                    return register();
                case url.endsWith('/users/refresh-token') && method === 'POST':
                    return refreshToken();
                case url.endsWith('/users/revoke-token') && method === 'POST':
                    return revokeToken();
                case url.endsWith('/users') && method === 'GET':
                    return getUsers();
                case url.endsWith('/orders') && method === 'GET':
                    return getOrders();
                case url.match(/\/orders\/\d+$/) && method === 'GET':
                    return getOrderById();
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }
        }

        function idFromUrl() {

            const urlParts = url.split('/');
            return parseInt(urlParts[urlParts.length - 1]);
        }

        // route functions
        function authenticate() {
            debugger
            const { username, password } = body;
            const user = users.find((x: any) => {

                return x.username === username && x.password === password;
            });

            if (!user) return error('Username or password is incorrect');

            // add refresh token to user
            user.refreshTokens.push(generateRefreshToken());
            localStorage.setItem(usersKey, JSON.stringify(users));

            return ok({
                userId: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                accessToken: generateJwtToken(user.username)
            })
        }

        function refreshToken() {

            const refreshToken = getRefreshToken();

            if (!refreshToken) return unauthorized();

            const user = users.find(x => x.refreshTokens.includes(refreshToken));

            if (!user) return unauthorized();

            // replace old refresh token with a new one and save
            user.refreshTokens = user.refreshTokens.filter(x => x !== refreshToken);

            user.refreshTokens.push(generateRefreshToken());

            localStorage.setItem(usersKey, JSON.stringify(users));

            return ok({
                userId: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                accessToken: generateJwtToken(user.username)
            })
        }

        function revokeToken() {
            debugger
            if (!isLoggedIn()) return unauthorized();

            const refreshToken = getRefreshToken();
            const user = users.find(x => x.refreshTokens.includes(refreshToken));

            // revoke token and save
            user.refreshTokens = user.refreshTokens.filter(x => x !== refreshToken);
            localStorage.setItem(usersKey, JSON.stringify(users));

            return ok();
        }

        function getUsers() {
            if (!isLoggedIn())
                return unauthorized();

            return ok(this.users);
        }

        function register() {
            const user = body

            if (users.find(x => x.username === user.username)) {
                return error('Username "' + user.username + '" is already taken')
            }

            user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));
            return ok();
        }

        function getOrderById() {
            debugger
            if (!isLoggedIn()) return unauthorized();

            var order = orders.filter(x => x.id == idFromUrl());

            return ok(order);
        }
        function getOrders() {
            debugger
            // return ok(orders.filter(x => x.status == idFromUrl()));
            return ok(orders);
        }

        // helper functions
        function ok(body?) {
            return of(new HttpResponse({ status: 200, body }))
        }

        function error(message) {
            return throwError({ error: { message } });
        }

        function unauthorized() {
            return throwError({ status: 401, error: { message: 'Unauthorised' } });
        }

        function generateJwtToken(userName: string) {

            // create token that expires in 15 minutes
            const tokenPayload =
            {
                exp: Math.round(new Date(Date.now() + 15 * 60 * 1000).getTime() / 1000),
                userName
            }

            // const tokenPayload = { exp: Math.round(new Date(Date.now() + 15*60*1000).getTime() / 1000) }

            return `fake-jwt-token.${btoa(JSON.stringify(tokenPayload))}`;
        }

        function generateRefreshToken() {

            const token = new Date().getTime().toString();

            // add token cookie that expires in 7 days
            // const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString();
            const expires = new Date(Date.now() + 7 * 60 * 1000).toUTCString();
            document.cookie = `fakeRefreshToken=${token}; expires=${expires}; path=/`;

            return token;
        }

        function getRefreshToken() {
            // get refresh token from cookie
            return (document.cookie.split(';').find(x => x.includes('fakeRefreshToken')) || '=').split('=')[1];
        }

        function isLoggedIn() {

            const authHeader = headers.get('Authorization');
            if (!authHeader?.startsWith('Bearer fake-jwt-token')) return false;

            // check if token is expired
            const jwtToken = JSON.parse(atob(authHeader.split('.')[1]));
            const tokenExpired = Date.now() > (jwtToken.exp * 1000);
            if (tokenExpired) return false;

            return true;
        }
    }
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};