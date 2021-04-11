import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BookComponent } from './book/book.component';
import { UsersComponent } from './users/users.component';
import { AddBookComponent } from './add-book/add-book.component';
import { RouterModule } from '@angular/router';
import { BookService } from '../services/book.service';



@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    BookComponent,
    UsersComponent,
    AddBookComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgBootstrapFormValidationModule
  ],
  exports: [
    HomeComponent
  ],
  providers: [
    BookService
  ]
})
export class PagesModule { }
