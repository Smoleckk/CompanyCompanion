import { Component, Input, Output, EventEmitter } from '@angular/core';
import { OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-customer-popup',
  templateUrl: './customer-popup.component.html',
  styleUrls: ['./customer-popup.component.scss'],
})
export class CustomerPopupComponent {
  @Input() form: any;
  @Input() header: any;
  @Input() someInfo: any;
  @Input() buttonName: any;

  @Output() callParent = new EventEmitter<String>();
  @Output() callGetRegonParent = new EventEmitter<String>();

  public form2: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form2 = this.formBuilder.group({
      firstName: new FormControl('', Validators.required),
      emailAddress: new FormControl('', Validators.required),
    });
  }

  callParentFunction() {
    this.callParent.emit();
  }

  callGetRegon() {
    this.callGetRegonParent.emit();
  }

  public onSubmit(): void {
    console.log(this.form2.value);
  }
}
