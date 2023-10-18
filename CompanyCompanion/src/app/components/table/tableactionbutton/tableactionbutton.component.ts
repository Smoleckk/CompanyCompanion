import { Component, Input  ,Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-tableactionbutton',
  templateUrl: './tableactionbutton.component.html',
  styleUrls: ['./tableactionbutton.component.scss']
})
export class TableactionbuttonComponent {
  @Output() callParent = new EventEmitter<String>();

  callParentFunction() {
    this.callParent.emit();
  }
  @Input() color: any;
  @Input() icon: any;

}
