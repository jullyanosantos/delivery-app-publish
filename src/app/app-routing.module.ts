import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import { OrderPanelComponent } from './main/order/order-panel/order-panel.component';
import { HomeComponent } from './main/home/home.component';
import { AuthGuard } from './shared/_helpers';
import { LoginComponent } from './account/login/login.component';
import { OrderHistoryComponent } from './main/order-history/order-history.component';
import { Login2Component } from './account/login2/login2.component';

const routes: Routes = [
    { path: 'account/login', component: LoginComponent },
    { path: 'account/login2', component: Login2Component },
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'app/main/home', component: HomeComponent, canActivate: [AuthGuard], data: { breadcrumb: "HOME" } },
    { path: 'app/main/order-panel', component: OrderPanelComponent, canActivate: [AuthGuard], data: { breadcrumb: "ORDERS" } },
    { path: 'app/main/order-history', component: OrderHistoryComponent, canActivate: [AuthGuard], data: { breadcrumb: "ORDERS-HISTORY" }, },

    // { path: '**', redirectTo: 'app/main/home' }
    { path: '**', redirectTo: '' }
];


@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
