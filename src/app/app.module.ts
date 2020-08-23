import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {Format} from './pipes/format';
import {AboutTodoComponent} from './components/about-item/about-todo.component';
import {RouterModule} from '@angular/router';
import {TodosComponent} from './components/todos/todos.component';
import {CommentFontDirective} from './directives/comment-font.directive';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {appRoutes, AppRoutingModule} from './app-routing.module';
import {HeaderComponent} from './components/header/header.component';


@NgModule({

  declarations: [
    AppComponent,
    Format,
    AboutTodoComponent,
    TodosComponent,
    CommentFontDirective,
    HeaderComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    DragDropModule,
    RouterModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
