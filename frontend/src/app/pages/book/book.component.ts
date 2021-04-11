import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  bookList: Array<Book> = []

  constructor(
    private bookService: BookService,
    private ngxService: NgxUiLoaderService,
    private notificationService: NotificationService, 
  ) { }

  ngOnInit() {
    this.loadData();
  }

  loadData(){
    this.ngxService.start()
    let user = JSON.parse(localStorage.getItem('user'))
    if(user.user){
      this.bookService.getAllMyBooks(user.user.id).subscribe( res => {
        if(res.books)
          this.bookList = res.books
        this.ngxService.stop()
      }, error => {
        this.ngxService.stop()
      })
    }
    
  }

  viewBook(book: Book){

  }

  deleteBook(book: Book){
    let conf = confirm("Are you sure..!")

    if(conf){
      this.ngxService.start()
      this.bookService.deleteBook(book.id).subscribe( res => {
        this.notificationService.deleteSuccess()
        this.ngxService.stop()
        this.loadData()
      }, error => {
        this.notificationService.deleteError()
        this.ngxService.stop()
      })
    }
  }

}
