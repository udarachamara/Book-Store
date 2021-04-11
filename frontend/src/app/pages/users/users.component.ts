import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { User } from 'src/app/models/user';
import { AuthorService } from 'src/app/services/author.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  userList: Array<User> = []

  constructor(
    private authorService: AuthorService,
    private notification: NotificationService,
    private ngxLoader: NgxUiLoaderService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData(){
    this.authorService.getAllAuthors().subscribe( res => {
      if(res.authors)
        this.userList = res.authors
    }, error => {

    })
  }

  inactive(user: User){
    let conf = confirm("Are you sure to do this..!")
    if(conf){
      this.ngxLoader.start()
      user['status'] = user['status'] == 1 ? 0 : 1
      this.authorService.inactiveAuthor(user.id, user).subscribe( res => {
        this.notification.updateSuccess()
        this.loadData();
        this.ngxLoader.stop()
      }, error => {
        this.notification.updateError()
        this.loadData();
        this.ngxLoader.stop()
      })
    }
  }

  delete(user: User){
    let conf = confirm("Are you sure to delete this..!")
    if(conf){
      this.ngxLoader.start()
      user['isDeleted'] = 1
      this.authorService.deleteAuthor(user.id).subscribe( res => {
        this.notification.deleteSuccess()
        this.loadData();
        this.ngxLoader.stop()
      }, error => {
        this.notification.deleteError()
        this.loadData();
        this.ngxLoader.stop()
      })
    }
  }

}
