import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {AboutItemComponent} from './components/about-item/about-item.component';
import {NotFoundComponent} from './components/not-found/not-found.component';

export const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'todo/:id', component: AboutItemComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class AppRoutingModule { }
