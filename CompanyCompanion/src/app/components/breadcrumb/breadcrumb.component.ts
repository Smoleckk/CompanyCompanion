import { Component, Input } from '@angular/core';
import { Action } from 'rxjs/internal/scheduler/Action';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {

  @Input() link: any;
  @Input() header: any;
  @Input() headerDetail: any;
  @Input() isAddButton: boolean = true;
  @Input() isPopup: boolean = false;
  @Input()
  akcja!: () => void;
}
