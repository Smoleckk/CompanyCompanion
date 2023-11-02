import { Component, Input  ,Output, EventEmitter} from '@angular/core';
import { Invoice } from 'src/app/models/invoice';

@Component({
  selector: 'app-tablecontent',
  templateUrl: './tablecontent.component.html',
  styleUrls: ['./tablecontent.component.scss']
})
export class TablecontentComponent {


  @Input() columns: any;
  @Input() dataSource: any;
  @Input() actionButtons: any;
  @Input() displayedColumns: any;

}
