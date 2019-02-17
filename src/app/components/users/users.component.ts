import { User } from './../../interface/models';
import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  public users = [];
  constructor(
    private usersService: UsersService,
    private flashMessagesService: FlashMessagesService
  ) { }

  ngOnInit() {
  // Получение всех пользователей
    this.usersService.getUsers().subscribe((users: User[]) => {
      if ( users) {
        this.users = users;
      }
    });
  // после прийденной от подпищека информацыии обновление масива и выввод сооия
    this.usersService.postsObservableUpdateSubject.subscribe((editUsers) => {
      console.log(editUsers);
      this.usersService.editUser(editUsers).subscribe((user: User) => {
        if (user['body']) {
          this.users = this.users.map(item => {
            if (item.id === user['id']) {
              item.email = user['body']['email'];
              item.name = user['body']['name'];
            }
            this.users = [...item];
          });
        }
        this.flashMessagesService.show(
          'Даные успешно отредактированны', {
            cssClass: 'alert-success',
            timeout: 1000
          }
        );
      });
    });
  }
}
