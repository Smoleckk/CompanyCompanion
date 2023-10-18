import { Component, Input  ,Output, EventEmitter} from '@angular/core';
import { Action } from 'rxjs/internal/scheduler/Action';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {
  @Output() callParent = new EventEmitter<string>();

  callParentFunction() {
    this.callParent.emit();
  }


  @Input() link: any;
  @Input() header: any;
  @Input() headerDetail: any;
  @Input() isAddButton: boolean = true;
  @Input() isPopup: boolean = false;

  
  @Input()
  akcja!: () => void;
}
