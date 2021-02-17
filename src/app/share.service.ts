import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';


import { User } from  'firebase';
export class UserInterface {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  authdata?: string;
}
@Injectable({
  providedIn: 'root'
})
export class ShareService {
  userFb:  User;
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(
      private router: Router,
      private http: HttpClient,
      public  afAuth:  AngularFireAuth,
      private firebaseAuth: AngularFireAuth
  ) {
      this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
      this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
      return this.userSubject.value;
  }
  login(email: string, password: string) {
    return this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password);
  }


  logout() {
    this.firebaseAuth
      .auth
      .signOut();
      localStorage.removeItem('user')
      this.router.navigate(['/'])
  }

  signup(email: string, password: string) {
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Success!', value);
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
      });    
  }
}