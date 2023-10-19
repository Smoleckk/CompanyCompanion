import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
})
export class FormFieldComponent {
  @Input()
  public form: FormGroup;
  @Input() label: any;
  @Input() conrolName: any;
  @Input() cssClass: string;
}
