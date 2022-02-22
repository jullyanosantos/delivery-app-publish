import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { mainContentAnimation } from './shared/utils/animations';
import { SidenavService } from './shared/componentes/layout/sidebar/sidenav.service';
import { OrderDetaisService } from './main/order/order-details/order-details.service';
import { OrderDetailsComponent } from './main/order/order-details/order-details.component';
import { AppComponentBase } from './shared/AppComponentBase';
import { LanguageService } from './shared/componentes/language/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    mainContentAnimation(),
  ]
})
export class AppComponent extends AppComponentBase implements OnInit {
  title = 'delivery-app-ui';

  sidebarState: string;
  sidebarOrderDetailState: boolean = false;
  isMiniSidebar = true;
  isExpadingMiniSideBar = false;
  showSideBar: boolean = false;


  @ViewChild("orderDetailsView") orderDetailsComponent: OrderDetailsComponent;

  constructor(
    injector: Injector,
    private sidebarService: SidenavService,
    private languageService: LanguageService,
    public sidebarOrderDetailsService: OrderDetaisService
  ) {

    super(injector);

    debugger

    var lang = this.languageService.getLanguage();

    this.translateService.use(lang.value);
  }

  ngOnInit() {
    this.sidebarService.sidebarStateObservable$
      .subscribe((newState: string) => {

        this.sidebarState = newState;
      });

    this.sidebarOrderDetailsService.sidebarStateOrderDetailObservable$
      .subscribe((state: string) => {
        this.sidebarOrderDetailState = state == "open" ? true : false;
      });

    this.initEvetns();

  }

  initEvetns() {

    this.sidebarService.showSideBar.subscribe((mode: any) => {

      this.showSideBar = true;
    });

    this.sidebarService.hideSideBar.subscribe((mode: any) => {
      this.showSideBar = false;
    });
  }

  t() {
    return false;
  }
  envarIdParaComponente() {

    let id = this.sidebarOrderDetailsService.getIdObservable().value;
    this.orderDetailsComponent.showDetails(id);
  }

  mouseenter() {

    if (this.sidebarService.isMiniSidebar) {
      // this.sidebarService.toggle();
      this.sidebarService.open();
      this.sidebarService.isExpadingMiniSideBar = true;
    }
  }

  mouseleave() {

    if (this.sidebarService.isMiniSidebar) {
      this.sidebarService.close();
      // this.sidebarService.toggle();
      this.sidebarService.isExpadingMiniSideBar = false;
    }
  }

  changeLanguage(language: string) {
    this.translateService.use(language);
  }

}