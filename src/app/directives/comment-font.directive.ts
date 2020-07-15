import {Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[appCommentFont]'
})
export class CommentFontDirective {

  constructor(private elementRef: ElementRef){

    this.elementRef.nativeElement.style.fontStyle = "oblique";
  }
}
