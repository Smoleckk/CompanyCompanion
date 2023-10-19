import { Component, Input  ,Output, EventEmitter} from '@angular/core';


@Component({
  selector: 'app-customer-popup',
  templateUrl: './customer-popup.component.html',
  styleUrls: ['./customer-popup.component.scss']
})
export class CustomerPopupComponent {
  @Input() form: any;
  @Input() header: any;
  @Input() someInfo: any;
  @Input() buttonName: any;

  @Output() callParent = new EventEmitter<String>();
  @Output() callGetRegonParent = new EventEmitter<String>();

  callParentFunction() {
    this.callParent.emit();
  }

  callGetRegon() {
    this.callGetRegonParent.emit();
  }
}
