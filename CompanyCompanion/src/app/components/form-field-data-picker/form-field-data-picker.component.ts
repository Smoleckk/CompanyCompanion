import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-field-data-picker',
  templateUrl: './form-field-data-picker.component.html',
  styleUrls: ['./form-field-data-picker.component.scss']
})
export class FormFieldDataPickerComponent {
  @Input()
  public form: FormGroup;
  @Input() label: any;
  @Input() controlName: any;
  @Input() cssClass: string;
  @Input() type: string;
  @Input() picker: any;
}
