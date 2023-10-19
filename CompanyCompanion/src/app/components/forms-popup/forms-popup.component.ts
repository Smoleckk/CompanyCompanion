import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-forms-popup',
  templateUrl: './forms-popup.component.html',
  styleUrls: ['./forms-popup.component.scss']
})
export class FormsPopupComponent {
  @Input() form: any;
  @Input() header: any;
  @Input() someInfo: any;
  @Input() buttonName: any;
  @Input() cssStyle: any;
  @Input() fields: any;

  @Output() callParent = new EventEmitter<String>();
  @Output() callGetRegonParent = new EventEmitter<String>();


  callParentFunction() {
    this.callParent.emit();
  }

}