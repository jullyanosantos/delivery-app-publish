import { NgModule, Injector, APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { UtilsModule } from './shared/utils/utils.module';
import { FormsModule } from '@angular/forms';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
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
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import {TooltipModule} from 'primeng/tooltip';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {AutoCompleteModule} from 'primeng/autocomplete';

import { ToastrModule } from 'ngx-toastr';
import { NgSelectModule } from '@ng-select/ng-select';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AlertService, } from '../assets/lib/service-base/alert/alert.service';
import { SweetAlertService, } from './shared/componentes/sweet-alert/sweet-alert-service'

import { OrderService } from './shared/_services/order.service';
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
import { LanguageComponent } from './shared/componentes/language/language.component';
import { OrderHistoryComponent } from './main/order-history/order-history.component';
import { NotificatonComponent } from './shared/componentes/notificaton/notificaton.component';
import { ProfileSettingsComponent } from './shared/componentes/profile-settings/profile-settings.component';
import { BreadcrumbComponent } from './shared/componentes/breadcrumb/breadcrumb.component';
import { SearchUserAutocompleteComponent } from './shared/componentes/search-user-autocomplete/search-user-autocomplete.component';
import { Login2Component } from './account/login2/login2.component';

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
    LoginComponent,
    LanguageComponent,
    OrderHistoryComponent,
    NotificatonComponent,
    ProfileSettingsComponent,
    BreadcrumbComponent,
    SearchUserAutocompleteComponent,
    Login2Component
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgSelectModule,
    UtilsModule,
    ServicesBaseModule,

    AppRoutingModule,
    // DragDropModule,
    PanelModule,
    TableModule,
    PaginatorModule,
    
    AngularMaterialModule,
    
    ButtonModule,
    RippleModule,
    TooltipModule,
    BreadcrumbModule,
    AutoCompleteModule,
    
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
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    AlertService,
    SweetAlertService,
    OrderService,
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