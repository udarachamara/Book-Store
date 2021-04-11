import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Book } from 'src/app/models/book';
import { AuthService } from 'src/app/services/auth.service';
import { BookService } from 'src/app/services/book.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  bookList: Array<Book> = []
  searchFormGroup: FormGroup

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private ngxService: NgxUiLoaderService,
    private bookService: BookService,
    private notificationService: NotificationService) { }

  ngOnInit() {
    this.getAllBooks()
    this.setForm()
  }

  setForm(){
    this.searchFormGroup = this.fb.group({
      inputCtrl: ['']
    })
  }

  getAllBooks(){
    this.ngxService.start()
    this.bookService.getActiveAuthorsBook().subscribe( res => {
      
      this.bookList = res.books
      
      this.ngxService.stop()
    }, error => {
      this.notificationService.showError("Somthing Went Wrong..", "Error..!")
      this.bookList = []
      this.ngxService.stop()
    })
  }

  getAuthorBookBy(id: number){
    console.log(id);
  }

  viewBook(book: Book){

  }

  search(){
    this.ngxService.start()
    let data = {
      search: this.searchFormGroup.controls.inputCtrl.value
    }

    this.bookService.searchBook(data).subscribe( res => {
      this.bookList = res.books
      this.ngxService.stop()
    }, error => {
      this.notificationService.showError("Somthing Went Wrong..", "Error..!")
      this.bookList = []
      this.ngxService.stop()
    })
  }

}
