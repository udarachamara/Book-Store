import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Book } from '../models/book';
import { User } from '../models/user';
import { Api } from '../shared/api-constatnt';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private httpClient: HttpClient) { }

  getAllAuthors(): Observable<any>{
    return this.httpClient.get<any>(Api.AUTHOR.PREFIX)
  }

  getAuthor(): Observable<User>{
    return this.httpClient.get<User>(Api.AUTHOR.PREFIX)
  }

  insertAuthor(data: any): Observable<User>{
    return this.httpClient.post<any>(Api.AUTHOR.PREFIX, data)
  }

  updateAuthor(data: User): Observable<User>{
    return this.httpClient.put<User>(Api.AUTHOR.PREFIX + '/'+data.id, data)
  }

  inactiveAuthor(id: number, data: any): Observable<any>{
    return this.httpClient.put(Api.AUTHOR.PREFIX + Api.AUTHOR.INACTIVE + '/'+ id, data)
  }

  getAllBook(): Observable<Book[]>{
    return this.httpClient.get<Book[]>(Api.AUTHOR.PREFIX + Api.AUTHOR.MY_BOOK)
  }

  deleteAuthor(id: number): Observable<any>{
    return this.httpClient.delete<any>(Api.AUTHOR.PREFIX + '/'+ id)
  }

}
