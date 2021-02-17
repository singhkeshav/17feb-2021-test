import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { TodoListComponent } from './todo-list/todo-list.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
 // { path: 'todo-list', component: TodoListComponent , canActivate: [AuthGuard]},
  { path: '**', component:  LoginComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
