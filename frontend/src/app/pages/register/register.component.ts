import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { AuthorService } from 'src/app/services/author.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerFormGroup: FormGroup

  constructor(
    private fb: FormBuilder,
    private ngxService: NgxUiLoaderService,
    private router: Router,
    private notificationService: NotificationService,
    private authorService: AuthorService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.registerFormGroup = this.fb.group({
      nameCtrl: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      emailCtrl: ['', Validators.compose([Validators.email, Validators.required])],
      passwordCtrl: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      cPasswordCtrl: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      roleCtrl: [2],
    })
  }

  onSubmit() {
    if (this.registerFormGroup.invalid)
      return

    if(this.registerFormGroup.controls.passwordCtrl.value != this.registerFormGroup.controls.cPasswordCtrl.value){
      this.notificationService.showWarning("Password Did not Match", "Warning..!")
      return
    }


    let user = new User()
    user.name = this.registerFormGroup.controls.nameCtrl.value
    user.email = this.registerFormGroup.controls.emailCtrl.value
    user.password = this.registerFormGroup.controls.passwordCtrl.value
    user.modifiedBy = 'SYSTEM'
    user.createdBy = 'SYSTEM'

    this.ngxService.start()
    this.authorService.insertAuthor(user).subscribe(res => {
      this.notificationService.saveSuccess()
      this.ngxService.stop()
      this.login(user.email, user.password)
    }, error => {
      this.notificationService.saveError()
      this.ngxService.stop()
    })
  }

  login(email: string, password: string){
    let data = new FormData();
    data.append('email', email);
    data.append('password', password);

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
