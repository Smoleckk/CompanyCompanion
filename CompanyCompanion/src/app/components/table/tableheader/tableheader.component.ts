import { Component, Input  ,Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-tableheader',
  templateUrl: './tableheader.component.html',
  styleUrls: ['./tableheader.component.scss']
})
export class TableheaderComponent {
  @Output() callParent = new EventEmitter<Event>();

  callParentFunction(event: Event) {
    this.callParent.emit(event);
  }
  @Input() header: any;
  @Input() searchPlaceholder: any;

}
