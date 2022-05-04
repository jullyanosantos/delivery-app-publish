import { EventEmitter, Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BehaviorSubject } from 'rxjs';

// import { LoggerService } from 'utils';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {

  public showSideBar: EventEmitter<any> = new EventEmitter();
  public hideSideBar: EventEmitter<any> = new EventEmitter();

  private sidenav: MatSidenav;
  private opened = false;
  private sidebarState = 'open';
  private sidebarStateChanged$ = new BehaviorSubject<string>(this.sidebarState);
  public sidebarStateObservable$ = this.sidebarStateChanged$.asObservable();

  public isMiniSidebar: boolean = false;
  private isMiniSidebarChanged$ = new BehaviorSubject<boolean>(this.isMiniSidebar);
  public isMiniSidebarObservable$ = this.isMiniSidebarChanged$.asObservable();

  public isExpadingMiniSideBar = false;
  private isExpadingMiniSideBarChanged$ = new BehaviorSubject<boolean>(this.isExpadingMiniSideBar);
  public isExpadingMiniSideBarObservable$ = this.isExpadingMiniSideBarChanged$.asObservable();

  constructor(
    //   private logger: LoggerService
  ) {


  }

  public setSidenav(sidenav: MatSidenav) {

    if (!sidenav) {
      //   this.logger.error('NavComponent: sidenav cannot be null');
    }

    this.sidenav = sidenav;
  }

  public open() {

    // this.opened = true;
    this.sidebarState = "open";
    this.sidebarStateChanged$.next(this.sidebarState);

    if (this.isExpadingMiniSideBar)
      this.isMiniSidebar = false;

    // return this.sidenav.open();
  }

  public close() {

    // this.opened = false;
    this.sidebarState = "close";
    this.sidebarStateChanged$.next(this.sidebarState);

    if (!this.isExpadingMiniSideBar)
      this.isMiniSidebar = true;
    // return this.sidenav.close();
  }

  // public toggle() {
  //   this.opened = !this.opened;
  //   return this.sidenav.toggle();
  // }

  toggle() {

    if (this.sidebarState == "open") {
      this.sidebarState = "close";
      this.isMiniSidebar = true;
    }
    else {
      this.sidebarState = "open";
      this.isMiniSidebar = false;
    }

    this.isMiniSidebarChanged$.next(this.isMiniSidebar);
    this.sidebarStateChanged$.next(this.sidebarState);
    // this.sidebarState = this.sidebarState === 'open' ? 'close' : 'open';
    // this.sidebarStateChanged$.next(this.sidebarState);
  }

  public isOpen(): boolean {
    return this.opened;
  }

}