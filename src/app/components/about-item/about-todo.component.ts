import {Component, OnInit} from '@angular/core';
import {TodoService} from '../../services/todo.service';
import {ActivatedRoute} from '@angular/router';
import {ToDo} from '../../models/todo.model';
import {TODOS} from '../constants/local-storage';

@Component({
  selector: 'app-about-item',
  templateUrl: './about-todo.component.html',
  styleUrls: ['./about-todo.component.css']
})
export class AboutTodoComponent implements OnInit {
  id: number;
  todo: ToDo;

  constructor(private  todoService: TodoService, private activateRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.id = +this.activateRoute.snapshot.params['id'];
    this.todo = JSON.parse(localStorage.getItem(TODOS)).find((x) => x.id === this.id);
  }


}
