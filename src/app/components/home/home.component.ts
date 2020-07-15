import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {ToDo, TodoService} from '../../services/todo.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {iterator} from 'rxjs/internal-compatibility';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {animate, keyframes, query, stagger, state, style, transition, trigger} from '@angular/animations';
// transform: 'translateY(-100%)',

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
     trigger('openCloseForm', [
       transition(':enter', [
         style({opacity: '0', transform: 'translateY(-296px)', height:'0'}),
         animate('1.6s linear',
           style({opacity: '1', transform: 'translateY(0)', height:'296px'})),
       ]),
      transition(':leave', [
         style({opacity: '1', transform: 'translateY(0)', height:'296px'}),
         animate('1.6s linear',
           style({opacity: '0', transform: 'translateY(-296px)', height:'0'})),
      ])
    ]),

    trigger('todo', [
      transition(':enter', [
        style({opacity: '0', transform: 'translateX(-100%)'}),
        animate('0.6s ease-out',
          style({opacity: '1', transform: 'translateX(0px)'})),
      ]),
      transition(':leave', [
        style({opacity: '1', transform: 'translateX(0px)'}),
        animate('0.6s ease-out',
          style({opacity: '0', transform: 'translateX(-100%)'})),
      ])
    ]),
    trigger('done', [
      transition(`:enter`, [
        style({opacity: '0', transform: 'translateX(100%)'}),
        animate('0.6s ease-out',
          style({opacity: '1', transform: 'translateX(0px)'})),
      ]),
      transition(':leave', [
        style({opacity: '1', transform: 'translateX(0px)'}),
        animate('0.6s ease-out',
          style({opacity: '0', transform: 'translateX(100%)'})),
      ])
    ]),
    trigger('openCloseFormButton', [
      transition(':enter', [
        style({opacity: '0', transform: 'translateY(-100%)', height:'0', zIndex:'1', position: 'relative', padding:'0', margin:'0', backgroundColor:'red'}),
        animate('0.3s linear',
          style({opacity: '1', transform: 'translateY(0)', height:'48px', zIndex:'1', position: 'relative', padding:'0', margin:'0', backgroundColor:'red'})),
      ]),
      transition(':leave', [
        style({opacity: '1', transform: 'translateY(0)', height:'48px', zIndex:'1', position: 'relative', padding:'0', margin:'0', backgroundColor:'red'}),
        animate('0.3s linear',
          style({opacity: '0', transform: 'translateY(-100%)', height:'0px', zIndex:'1', position: 'relative', padding:'0', margin:'0', backgroundColor:'red'})),
      ])
    ]),
  ]
})


export class HomeComponent implements OnInit, OnDestroy{
  isOpen = false;
  inputImg;
  toDos: ToDo[];
  done: ToDo[];
  tempId: number;
  myForm: FormGroup;
  height:number;

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

  addToDo(): void {
    console.log(this.tempId);
    this.toDos.push(new ToDo(this.myForm.value.userName.trim(), this.myForm.value.userComment.trim(), this.inputImg, ++this.tempId));
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
    localStorage.setItem('localTodos', JSON.stringify(this.toDos.concat(this.done)));
    this.completeEdit();
  }
}
