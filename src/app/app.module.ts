import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatChipsModule} from '@angular/material/chips';

import { AngularFireModule  } from 'angularfire2';
// import { AngularFireAuth  } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { HttpClientModule } from '@angular/common/http';
// import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TodoListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    // AngularFireAuth,
    AngularFireAuthModule,
    MatInputModule,
    MatExpansionModule,
    MatToolbarModule,
    MatIconModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatChipsModule,
    AngularFirestoreModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    
    ReactiveFormsModule,
    // AngularFireAuth,
    AngularFireModule.initializeApp( {
      apiKey: "AIzaSyABcEa0DiDZMdifsSE4Hgr-h7YGLRvliXY",
      authDomain: "system-test-77aa9.firebaseapp.com",
      databaseURL: "https://system-test-77aa9.firebaseio.com",
      projectId: "system-test-77aa9",
      storageBucket: "system-test-77aa9.appspot.com",
      messagingSenderId: "223204323729",
      appId: "1:223204323729:web:bdcd88aaf56b15d7f8aa30"
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[TodoListComponent]
})
export class AppModule { }
