import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-product-popup',
  templateUrl: './product-popup.component.html',
  styleUrls: ['./product-popup.component.scss']
})
export class ProductPopupComponent {
  @Input() form: any;
  @Input() header: any;
  @Input() someInfo: any;
  @Input() buttonName: any;
  @Input() cssStyle: any;

  @Output() callParent = new EventEmitter<String>();
  @Output() callGetRegonParent = new EventEmitter<String>();


  callParentFunction() {
    this.callParent.emit();
  }

}