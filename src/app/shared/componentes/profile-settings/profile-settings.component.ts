import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/user';
import { AuthenticationService } from '../../_services/authentication.service';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss']
})
export class ProfileSettingsComponent {

  currentUser: User = new User();

  constructor(private authService: AuthenticationService) {

    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  public logout() {
    this.authService.logout();
  }
}