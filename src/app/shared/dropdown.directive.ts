import { Directive, ElementRef, HostBinding, HostListener, Output, Renderer2 } from "@angular/core";

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen = false;

  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  @HostListener('click') toggleDropdown() {
    this.isOpen = !this.isOpen;
  }
}