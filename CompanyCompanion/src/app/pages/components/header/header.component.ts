import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  animationClass: string;
  
  @Input() title: string;
  @Input() subTitle: string;
  ngOnInit() {
    // Losowe wybieranie między slide-right i slide-left
    this.animationClass = Math.random() < 0.5 ? 'slide-right' : 'slide-left';
  }
}
