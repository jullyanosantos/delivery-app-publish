import { Component, Injector, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../../assets/lib/service-base/alert/alert.service';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/shared/_services/authentication.service';
import { SidenavService } from 'src/app/shared/componentes/layout/sidebar/sidenav.service';
import { AppComponentBase } from '../../shared/AppComponentBase';

@Component({
  selector: 'app-login2',
  templateUrl: './login2.component.html',
  styleUrls: ['./login2.component.scss']
})
export class Login2Component extends AppComponentBase implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  private formSubmitAttempt: boolean;

  constructor(
    injector: Injector,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private sidebarService: SidenavService
  ) {

    super(injector);

    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      // this.router.navigate(['/app/main/home']);
    }

    this.sidebarService.hideSideBar.emit(true);
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: ['', '']
    });


    this.checkRememberMe();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    signUpButton.addEventListener('click', () => {
      container.classList.add("right-panel-active");
    });

    signInButton.addEventListener('click', () => {
      container.classList.remove("right-panel-active");
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  isFieldInvalid(field: string) {
    return (
      (!this.loginForm.get(field).valid && this.loginForm.get(field).touched) ||
      (this.loginForm.get(field).untouched && this.formSubmitAttempt)
    );
  }

  onSubmit() {

    this.alertService.clear();
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    debugger
    this.rememberMe();

    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {

          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.error = error;
          // this.alertService.error(error);
          this.sweetAlertService.error(error);
          this.loading = false;
        });
  }

  rememberMe(): void {
    var remember = this.f.rememberMe.value;

    if (remember) {
      localStorage.setItem('usernameSession', this.f.username.value);
      localStorage.setItem('rememberMeSession', JSON.stringify(remember));
    }
  }

  checkRememberMe(): void {
    
    debugger
    if (localStorage.getItem('usernameSession') !== null) {

      this.f.username.setValue(localStorage.getItem('usernameSession'));
      this.f.rememberMe.setValue(localStorage.getItem('rememberMeSession'));
    }
  }
}