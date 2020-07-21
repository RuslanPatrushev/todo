import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {Format} from './pipes/format';
import {AboutItemComponent} from './components/about-item/about-item.component';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {CommentFontDirective} from './directives/comment-font.directive';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {appRoutes, AppRoutingModule} from './app-routing.module';




@NgModule({

  declarations: [
    AppComponent,
    Format,
    AboutItemComponent,
    HomeComponent,
    NotFoundComponent,
    CommentFontDirective,
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
