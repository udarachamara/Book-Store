import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {

  addBookFormGroup: FormGroup

  constructor(
    private fb: FormBuilder,
    private ngxService: NgxUiLoaderService,
    private notificationService: NotificationService,
    private bookService: BookService
  ) { }

  ngOnInit() {
    this.addBookFormGroup = this.fb.group({
      nameCtrl: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      descriptionCtrl: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(100)])],
      priceCtrl: ['', Validators.required],
      countCtrl: ['', Validators.compose([Validators.required, Validators.min(1)])]
    })
  }

  onSubmit() {
    if (this.addBookFormGroup.invalid)
      return

    let user = JSON.parse(localStorage.getItem('user'))

    if (user.user) {
      let book = new Book()
      book.name = this.addBookFormGroup.controls.nameCtrl.value
      book.price = this.addBookFormGroup.controls.priceCtrl.value
      book.description = this.addBookFormGroup.controls.descriptionCtrl.value
      book.count = this.addBookFormGroup.controls.countCtrl.value
      book.author = user.user.id
      book.modifiedBy = 'SYSTEM'
      book.createdBy = 'SYSTEM'

      this.ngxService.start()
      this.bookService.insertBook(book).subscribe(res => {
        this.notificationService.saveSuccess()
        this.ngxService.stop()
        this.addBookFormGroup.reset()
      }, error => {
        this.notificationService.saveError()
        this.ngxService.stop()
      })
    }

  }

}
