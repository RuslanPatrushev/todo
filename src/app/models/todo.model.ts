export class ToDo {
  name: string;
  comment: string;
  done: boolean;
  editable: boolean;
  img;
  id: number;

  constructor(name: string, comment: string, img, id: number) {
  this.name = name;
  this.comment = comment;
  this.done = false;
  this.editable = false;
  this.img = img;
  this.id = id;
}
}
