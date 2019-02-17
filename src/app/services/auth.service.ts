import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

// проверка если в localStorage auth
  isAuth() {
    if (localStorage.auth !== undefined) {
      return true;
    } else {
      return false;
    }
  }
}
