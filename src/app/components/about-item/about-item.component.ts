import {Component, OnInit} from '@angular/core';
import {ToDo, TodoService} from '../../services/todo.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-about-item',
  templateUrl: './about-item.component.html',
  styleUrls: ['./about-item.component.css']
})
export class AboutItemComponent implements OnInit {
  id: number;
  todo: ToDo;

  constructor(private  todoService: TodoService, private activateRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.id = +this.activateRoute.snapshot.params['id'];
    console.log(this.id);
    this.todo =JSON.parse( localStorage.getItem("localTodos")).find((x) => x.id === this.id);;
    console.log(this.todo);
  }


}
