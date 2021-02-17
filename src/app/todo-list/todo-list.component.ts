import { Component, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ShareService } from '../share.service';
import { MatDialogRef } from '@angular/material/dialog';

interface Todo {
  title: string;
  body: string;
  id?: string;
  datemodified?: Date;
  isDone?: boolean;
}
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  todoCollection: AngularFirestoreCollection<Todo>;
  todoList: Observable<Todo[]>;
  todoDoc: AngularFirestoreDocument<Todo>;
  inputId: string;
  inputValue: Todo = {
    title: "",
    body: ''
  }

  isSubmit = false;
  editValue: boolean = false;
  constructor(public afs: AngularFirestore, public snackBar: MatSnackBar,private authService: ShareService,private dialogRef: MatDialogRef<TodoListComponent>
    ) {
  }
  ngOnInit() {

    this.todoCollection = this.afs.collection('Todolist');
    this.todoList = this.afs.collection('Todolist', ref => ref.orderBy('datemodified')).snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Todo;
        data.id = a.payload.doc['id'];
        return data;
      })
    })
  }

  addNewItem() {
    if(this.inputValue.body == '' || this.inputValue.title == '' ){
      this.isSubmit = true;
      return
    }      this.inputValue.datemodified = new Date();
      this.inputValue.isDone = false;
      this.todoCollection.add(this.inputValue);
      this.inputValue.title = "";
      this.inputValue.body = "";
      this.isSubmit = false;

      this.openSnackBar("Added Successfuly!", "Dismiss");
   // }
  }

  deleteItem(i) {
    this.todoDoc = this.afs.doc(`Todolist/${i}`);
    this.todoDoc.delete();
    this.openSnackBar("Item Deleted!", "Dismiss");
  }
  editItem(i) {
    this.inputValue = i;
    this.editValue = true;
    this.inputId = i.id;
  }
  markItemAsDone(item) {
    this.inputValue = item;
    this.inputValue.isDone = true;
    this.todoDoc = this.afs.doc(`Todolist/${item.id}`);
    this.todoDoc.update(this.inputValue);
    this.inputValue.title = "";
    this.inputValue.body = "";
    this.openSnackBar("Item Done!", "Dismiss");
  }

  //markItem
  markItemAsNotDone(item) {
    this.inputValue = item;
    this.inputValue.isDone = false;
    this.todoDoc = this.afs.doc(`Todolist/${item.id}`);
    this.todoDoc.update(this.inputValue);
    this.inputValue.title = "";
    this.inputValue.body = "";
    this.openSnackBar("Item Not Done!", "Dismiss");
  }
  //Save Item
  saveNewItem() {
    if(this.inputValue.body == '' || this.inputValue.title == '' ){
      this.isSubmit = true;
      return
    } 
    this.isSubmit = false;
      this.inputValue.isDone = false;
      this.inputValue.datemodified = new Date();
      this.todoDoc = this.afs.doc(`Todolist/${this.inputId}`);
      this.todoDoc.update(this.inputValue);
      this.editValue = false;
      this.inputValue.title = "";
      this.inputValue.body = "";
      this.openSnackBar("Updated Successfuly!", "Dismiss");
  //  }
  }
  //open Snack...
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top',
    });
  }

  //logout
  logout(){
    this.dialogRef.close();

    this.authService.logout();

  }


}
