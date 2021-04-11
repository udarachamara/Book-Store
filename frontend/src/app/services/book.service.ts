import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Book } from '../models/book';
import { Api } from '../shared/api-constatnt';

@Injectable()
export class BookService {

  constructor(private httpClient: HttpClient) { }

  getAllBooks(): Observable<Book[]>{
    return this.httpClient.get<Book[]>(Api.BOOK.PREFIX)
  }

  getAllMyBooks(id: number): Observable<any>{
    return this.httpClient.get<any>(Api.BOOK.PREFIX + Api.BOOK.BY_AUTHOR + '/' + id)
  }

  getBook(): Observable<Book>{
    return this.httpClient.get<Book>( Api.BOOK.PREFIX)
  }

  getActiveBook(id: number): Observable<Book>{
    return this.httpClient.get<Book>( Api.BOOK.PREFIX + Api.BOOK.ACTIVE_BOOK + '/' + id)
  }

  getActiveAuthorsBook(): Observable<any>{
    return this.httpClient.get<any>( Api.BOOK.PREFIX + Api.BOOK.BY_ACTIVE_AUTHORS)
  }

  insertBook(data: Book): Observable<Book>{
    return this.httpClient.post<Book>(Api.BOOK.PREFIX, data)
  }

  updateBook(data: Book): Observable<Book>{
    return this.httpClient.put<Book>(Api.BOOK.PREFIX + '/'+ data.id, data)
  }

  deleteBook(id: number): Observable<any>{
    return this.httpClient.delete<any>(Api.BOOK.PREFIX + '/'+ id)
  }
}
