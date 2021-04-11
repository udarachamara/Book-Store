import { Component, OnInit } from '@angular/core';
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

  constructor(
    private authService: AuthService,
    private ngxService: NgxUiLoaderService,
    private bookService: BookService,
    private notificationService: NotificationService) { }

  ngOnInit() {
    this.getAllBooks()
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

}
