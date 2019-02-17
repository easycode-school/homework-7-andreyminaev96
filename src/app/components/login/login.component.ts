import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  login;
  password;

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    //валидацыяф формЫ
    this.form = new FormGroup({
      login: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  // Создание информацыи о пользователе и добавление в localStorage
  onSubmit() {
    const userInfoLogin = {
      login: this.login,
      password: this.password
    };

    localStorage.setItem('auth', JSON.stringify(userInfoLogin));
    this.form.reset();
// проверка на гард в localStorage
    if (this.auth.isAuth()) {
        this.router.navigate(['/users']);
    }
  }


}
