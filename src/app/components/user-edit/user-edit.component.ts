import { User } from './../../interface/models';
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  form: FormGroup;
  name: string;
  email: string;
  id: number;

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    // валидацыя полей
    this.form = new FormGroup({
      fullName: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      email: new FormControl(null, [Validators.required, Validators.email])
    });

  // Получение информыцыи о пользователе
    this.id = this.route.snapshot.params['id'];
    this.usersService.getUser(this.id).subscribe((user) => {
      this.name = user['name'],
      this.email = user['email']
    });

  }

  // изминение пользователя и добавление  слушателя и ридерект на страницу users
  onSubmit() {
    const updateUser = {
      email: this.email,
      id: Number(this.id),
      name: this.name
    };
    this.usersService.emitUpdateUser(updateUser);
    this.router.navigate(['/users']);
  }

}
