import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { UtilsModule } from './shared/utils/utils.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ServicesBaseModule } from '../assets/lib/service-base/services-base.module';

// import { MatToolbarModule } from '@angular/material/toolbar';
// import { MatIconModule } from '@angular/material/icon';
// import { MatCardModule } from '@angular/material/card';
// import { MatButtonModule } from '@angular/material/button';
// import { DragDropModule } from '@angular/cdk/drag-drop';

import { AngularMaterialModule } from './shared/utils/angular-material/angular-material.module';

// import { DragDropModule } from 'primeng/dragdrop';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';

import { ToastrModule } from 'ngx-toastr';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AlertService, } from '../assets/lib/service-base/alert/alert.service';
import { SweetAlertService, } from './shared/componentes/sweet-alert/sweet-alert-service'

import { PedidoService } from './shared/_services/pedido.service';
import { AuthenticationService } from './shared/_services/authentication.service';
import { HomeComponent } from './main/home/home.component';
import { OrderPanelComponent } from './main/order/order-panel/order-panel.component';
import { AlertMessageComponent } from '././shared/componentes/alert-message/alert-message.component';
import { HeaderComponent } from './shared/componentes/layout/header/header.component';
import { SidebarComponent } from './shared/componentes/layout/sidebar/sidebar.component';
import { OrderDetailsComponent } from './main/order/order-details/order-details.component';
import { KanbanBoardComponent } from './shared/componentes/board-kanban/kanban-board/kanban-board.component';
import { LoginComponent } from './account/login/login.component';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { fakeBackendProvider } from './shared/_helpers';
import { ErrorInterceptor, JwtInterceptor, appInitializer } from './shared/_helpers';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    AlertMessageComponent,
    AppComponent,
    HomeComponent,
    OrderPanelComponent,
    HeaderComponent,
    SidebarComponent,
    OrderDetailsComponent,
    KanbanBoardComponent,
    LoginComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    UtilsModule,
    ServicesBaseModule,

    AppRoutingModule,
    // DragDropModule,
    PanelModule,
    TableModule,
    AngularMaterialModule,
    ToastrModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    PerfectScrollbarModule,
  ],
  providers: [
    AlertService,
    SweetAlertService,
    PedidoService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      multi: true,
      deps: [AuthenticationService]
    },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}