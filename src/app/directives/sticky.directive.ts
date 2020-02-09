import {Directive, ElementRef, HostListener, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appSticky]'
})
export class StickyDirective implements OnInit {

  constructor(private renderer2: Renderer2, private element: ElementRef) { }

  ngOnInit(): void {

  }

  @HostListener('window:scroll', [])
  onScroll() {
    if (window.pageYOffset >= this.element.nativeElement.offsetTop) {
      this.renderer2.addClass(this.element.nativeElement, 'sticky');
    } else {
      this.renderer2.removeClass(this.element.nativeElement, 'sticky');
    }
  }

}
