import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShareService } from '../share.service';
import {MatDialog} from '@angular/material/dialog';
import { TodoListComponent } from '../todo-list/todo-list.component';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authService: ShareService,
      public dialog: MatDialog,
      public snackBar: MatSnackBar
  ) { 
      
  }

  ngOnInit() {
   // this.openDialog()

      this.loginForm = this.formBuilder.group({
          username: ['keshav37207@gmail.com', Validators.required],
          password: ['keshav@12345', Validators.required]
      });

      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.loginForm.invalid) {
          return;
      }

      this.loading = true;
      this.authService.login(this.f.username.value, this.f.password.value).then(res=>{
        localStorage.setItem('user', JSON.stringify(JSON.stringify(res)));
        //this.router.navigate(['todo-list'])
        this.openSnackBar("Login Successfully", "Dismiss");

        this.openDialog()
      }).catch(err=>{
        this.openSnackBar("Invalid Credentail", "Dismiss");
      });

    }
      openDialog() {
        const dialogRef = this.dialog.open(TodoListComponent,{width:'100%',minHeight: "500px"});
    
        dialogRef.afterClosed().subscribe(result => {
          console.log(`Dialog result: ${result}`);
        });
      
         
  }

  logout() {
    this.authService.logout();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top',
    });
  }
}