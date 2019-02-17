import { User } from './../interface/models';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl: string = environment.apiUrl;
  constructor(
    private http: HttpClient
  ) { }

  private users: User[] = [
    {
      email: '',
      id: 0,
      name: ''
    }
  ];

  //подписка на измененій елемент
  private _updateUserSourse = new BehaviorSubject(this.users);
  public postsObservableUpdateSubject = this._updateUserSourse.asObservable();

  // Получение пользователей
  public getUsers() {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }
  // Получение одного пользователя
  public getUser(id: number) {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`);
  }

 // Изминение  одного пользователя
  public editUser(user) {
    console.log(user)
    return this.http.put(`${this.apiUrl}/users/${user['id']}`, {
      body: user
    });
  }

  // добавление слушателя
  public emitUpdateUser(user) {
    this._updateUserSourse.next(user);
  }
}
