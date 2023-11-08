import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslocoService } from '@ngneat/transloco';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  contactForm: FormGroup = this.builder.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    message: [''],
  });

  constructor(
    private builder: FormBuilder,
    private toaster: ToastrService,
    private readonly translocoService: TranslocoService
  ) {}

  proceedLogin(): void {
    this.contactForm.markAllAsTouched();
    if (this.contactForm.valid) {
      console.log(this.contactForm.value);
      this.contactForm.reset({
        username: '',
        email: '',
        message: '',
      });
      this.toaster.success(
        this.translocoService.translate('toaster.toasterRegisterSuccessfully')
      );
    } else {
      this.toaster.warning(
        this.translocoService.translate('toaster.toasterWrongInputData')
      );
    }
  }
}
