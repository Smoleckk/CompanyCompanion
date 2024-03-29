import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-home-card',
  templateUrl: './home-card.component.html',
  styleUrls: ['./home-card.component.scss'],
})
export class HomeCardComponent {
  @Input() title: any;
  @Input() subTitle: any;
  @Input() navLink: any;
}
