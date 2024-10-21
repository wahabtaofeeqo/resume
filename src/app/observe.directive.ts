import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[observe]',
  standalone: true
})
export class ObserveDirective implements AfterViewInit {

  @Input({required: false}) classes: any[]

  constructor(private element: ElementRef) { }

  ngAfterViewInit(): void {
    let ele = this.element.nativeElement;
    const option = {
      root: document.body,
      rootMargin: "0px",
      threshold: 0.5,
    };
    
    const observer = new IntersectionObserver(this.callback, option);
    if(ele) observer.observe(ele)
  }

  callback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('animate__bounceOutRight'); // Element in view
        entry.target.classList.add('animate__bounceInRight')
      } else {
        entry.target.classList.remove('animate__bounceInRight')
        entry.target.classList.add('animate__bounceOutRight'); // Element out of view
      }
    });
  }
}
