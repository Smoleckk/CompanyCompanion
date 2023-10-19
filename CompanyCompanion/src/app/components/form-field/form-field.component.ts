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
  @Input() controlName: any;
  @Input() cssClass: string;
  @Input() type: string;
}
