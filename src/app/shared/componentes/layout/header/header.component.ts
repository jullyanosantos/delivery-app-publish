import { Component, EventEmitter, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SidenavService } from '../sidebar/sidenav.service';
import { AuthenticationService } from '../../../_services/authentication.service';
import { User } from 'src/app/shared/_models/user';
// import { LoggerService } from 'utils';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Output() toggleSidenav = new EventEmitter<void>();

  currentUser: User = new User();

  private returnUrl = '/';

  constructor(
    private authService: AuthenticationService,
    private sidebarService: SidenavService,
    private router: Router,
    // private logger: LoggerService
  ) {

    this.authService.currentUser.subscribe(x => this.currentUser = x);

    this.router.events.subscribe((event) => {

      if (event instanceof NavigationEnd) {
        this.returnUrl = event.url;
        //colocar msg se deseja realmente sair
        // this.logger.info('NavigationBarComponent returnUrl: ' + this.returnUrl);
      }

    });
  }

  toggleSideNav() {
    this.sidebarService.toggle();
  }

  public onProfile() {

    this.router.navigate(['users/profile']);
  }

  public isAuthenticated() {
    return this.authService.isLogged();
  }

  public logout() {
    this.authService.logout();
  }
}