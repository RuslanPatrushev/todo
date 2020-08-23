import {Injectable} from '@angular/core';
import {ToDo} from '../models/todo.model';
import {TODOS} from '../components/constants/local-storage';



@Injectable({
  providedIn: 'root'
})
export class TodoService {

  toDos: ToDo[] =
    [
      {name: 'Get to work', comment: 'IT', done: false, editable: false, img: '', id: 1},
      {name: 'Pick up groceries', comment: '', done: false, editable: false, img: '', id: 2},
      {name: 'Fall asleep', comment: 'at 11 pm', done: true, editable: false, img: '', id: 3},
      {name: 'Go todos', comment: '', done: true, editable: false, img: '', id: 4},
      {name: 'Walk dog', comment: '', done: false, editable: false, img: '', id: 5}
    ];

  sortingMas(flag: string, toDos: ToDo[]) {
    toDos.sort(function(a, b) {
      if (a[flag] > b[flag]) {
        return 1;
      }
      if (a[flag] < b[flag]) {
        return -1;
      }
      return 0;
    });
  }

  completeEdit(todos: ToDo[]) {
    todos.forEach(function(value, index, array) {
      if (value.editable) {
        this.saveToDo(value, index);
      }
    });
  }

  saveToDo(mas: ToDo[], ind: number) {
    if (mas[ind].name && mas[ind].name.trim()) {
      mas[ind].editable = !mas[ind].editable;
    } else {
      mas.splice(ind, 1);
    }
  }

  getToDos(flag: boolean) {
    if (flag) {
      if (!localStorage.getItem(TODOS)) {
        return this.toDos.filter((value) => !value.done);
      } else {
        return JSON.parse(localStorage.getItem(TODOS)).filter((value, index, array) => !value.done);
      }
    } else if (!localStorage.getItem(TODOS)) {
      return this.toDos.filter((value) => value.done);
    } else {
      return JSON.parse(localStorage.getItem(TODOS)).filter((value, index, array) => value.done);
    }
  }

}
