import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Auth } from 'src/app/models/auth';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginFormGroup: FormGroup

  constructor(
    private fb: FormBuilder,
    private ngxService: NgxUiLoaderService,
    private router: Router,
    private notificationService: NotificationService,
    private authService: AuthService) { }

  ngOnInit() {

    this.loginFormGroup = this.fb.group({
      emailCtrl: ['', Validators.compose([Validators.email, Validators.required])],
      passwordCtrl: ['', Validators.required]
    })
  }

  onSubmit() {
    if (this.loginFormGroup.invalid)
      return

    let data = new FormData();
    data.append('email', this.loginFormGroup.controls.emailCtrl.value);
    data.append('password', this.loginFormGroup.controls.passwordCtrl.value);

    this.ngxService.start()
    this.authService.isAuthenticated(data).subscribe(res => {

      this.authService.setUser(res)
      this.ngxService.stop()
      location.reload()
    }, error => {
      this.notificationService.showError("Login faield..", "Error")
      this.ngxService.stop()
    })
  }

}
