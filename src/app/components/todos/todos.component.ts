import {Component, OnDestroy, OnInit} from '@angular/core';
import {TodoService} from '../../services/todo.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {animate, style, transition, trigger} from '@angular/animations';
import {ToDo} from '../../models/todo.model';
import {TODOS} from '../constants/local-storage';

@Component({
  selector: 'app-home',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
  animations: [
    trigger('openCloseForm', [
      transition(':enter', [
        style({opacity: '0', transform: 'translateY(-296px)', height: '0'}),
        animate('0.3s linear',
          style({opacity: '1', transform: 'translateY(0)', height: '296px'})),
      ]),
      transition(':leave', [
        style({opacity: '1', transform: 'translateY(0)', height: '296px'}),
        animate('0.3s linear',
          style({opacity: '0', transform: 'translateY(-296px)', height: '0'})),
      ])
    ]),

    trigger('todo', [
      transition(':enter', [
        style({opacity: '0', transform: 'translateX(-100%)'}),
        animate('0.3s ease-out',
          style({opacity: '1', transform: 'translateX(0px)'})),
      ]),
      transition(':leave', [
        style({opacity: '1', transform: 'translateX(0px)'}),
        animate('0.3s ease-out',
          style({opacity: '0', transform: 'translateX(-100%)'})),
      ])
    ]),
    trigger('done', [
      transition(`:enter`, [
        style({opacity: '0', transform: 'translateX(100%)'}),
        animate('0.3s ease-out',
          style({opacity: '1', transform: 'translateX(0px)'})),
      ]),
      transition(':leave', [
        style({opacity: '1', transform: 'translateX(0px)'}),
        animate('0.3s ease-out',
          style({opacity: '0', transform: 'translateX(100%)'})),
      ])
    ]),
    trigger('openCloseFormButton', [
      transition(':enter', [
        style({opacity: '0', transform: 'translateY(-100%)', height: '0'}),
        animate('0.3s linear',
          style({opacity: '1', transform: 'translateY(0)', height: '48px'})),
      ]),
      transition(':leave', [
        style({opacity: '1', transform: 'translateY(0)', height: '48px'}),
        animate('0.3s linear',
          style({opacity: '0', transform: 'translateY(-100%)', height: '0px'})),
      ])
    ]),
  ]
})


export class TodosComponent implements OnInit, OnDestroy {
  isOpen = false;
  inputImg;
  toDos: ToDo[];
  done: ToDo[];
  tempId: number;
  myForm: FormGroup;

  constructor(private  todoService: TodoService) {
    this.myForm = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      userComment: new FormControl('', []),
    });
  }


  ngOnInit() {
    this.toDos = this.todoService.getToDos(false);
    this.done = this.todoService.getToDos(true);
    this.completeEdit();
    this.tempId = this.toDos.length + this.done.length;
  }

  addToDo() {
    this.toDos.push(new ToDo(this.myForm.value.userName.trim(), this.myForm.value.userComment.trim(), this.inputImg, ++this.tempId));
    localStorage.setItem(TODOS, JSON.stringify(this.toDos.concat(this.done)));
  }

  completeEdit() {
    this.isOpen = false;
    this.todoService.completeEdit(this.done);
    this.todoService.completeEdit(this.toDos);
  }

  saveToDo(mas: ToDo[], ind: number) {
    this.todoService.saveToDo(mas, ind);
  }

  sortingMas(sort: string) {
    this.todoService.sortingMas(sort, this.toDos);
    this.todoService.sortingMas(sort, this.done);
  }

  onFileChange(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.inputImg = reader.result;
      };
    }
  }

  drop(event: CdkDragDrop<ToDo[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      event.container.data[event.currentIndex].done = !event.container.data[event.currentIndex].done;
    }
  }

  openForm() {
    this.isOpen = true;
  }

  closeForm() {
    this.isOpen = false;
  }


  ngOnDestroy() {
    localStorage.setItem(TODOS, JSON.stringify(this.toDos.concat(this.done)));
    this.completeEdit();
  }
}
