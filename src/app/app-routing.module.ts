import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes} from '@angular/router';
import {TodosComponent} from './components/todos/todos.component';
import {AboutTodoComponent} from './components/about-item/about-todo.component';

export const appRoutes: Routes = [
  {path: '', component: TodosComponent},
  {path: 'todo/:id', component: AboutTodoComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class AppRoutingModule {
}
