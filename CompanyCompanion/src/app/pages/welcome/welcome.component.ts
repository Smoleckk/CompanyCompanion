import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Renderer2, ElementRef } from '@angular/core';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements AfterViewInit  {
  hideMenu: boolean = true;
  
  constructor(private renderer: Renderer2, private el: ElementRef) {}
  
  HideMenu() {
    this.hideMenu = !this.hideMenu;
  }
  ngAfterViewInit() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.9,
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.renderer.addClass(this.el.nativeElement, 'animate-left');
          this.renderer.addClass(this.el.nativeElement, 'animate-right');
          this.renderer.addClass(this.el.nativeElement, 'drop-in-from-down');
          observer.unobserve(entry.target);
        }
      });
    }, options);

    const elementsToObserve = document.querySelectorAll('.testimonials-col');
    elementsToObserve.forEach((element) => {
      observer.observe(element);
    });

    const elementsToObserve2 = document.querySelectorAll('.contact-section');
    elementsToObserve2.forEach((element) => {
      observer.observe(element);
    });
  }
}

