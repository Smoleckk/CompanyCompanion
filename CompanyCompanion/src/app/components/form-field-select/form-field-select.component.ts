import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-field-select',
  templateUrl: './form-field-select.component.html',
  styleUrls: ['./form-field-select.component.scss'],
})
export class FormFieldSelectComponent {
  @Input()
  public form: FormGroup;
  @Input() label: any;
  @Input() controlName: any;
  @Input() cssClass: string;
  @Input() items: any;
}
