import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appToggle]'
})
export class ToggleDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  @HostListener('click', ['$event.target']) onMouseClick() {
    this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
  }
}
