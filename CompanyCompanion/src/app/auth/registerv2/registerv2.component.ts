import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  FormControl,
  FormGroupDirective,
  NgForm,
  ValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from 'src/app/service/customer.service';
import { AuthService } from '../../service/auth.service';

export function matchValidator(
  matchTo: string,
  reverse?: boolean
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const parent = control.parent;

    if (parent && reverse) {
      const matchingControl = parent.get(matchTo);

      if (matchingControl) {
        matchingControl.updateValueAndValidity();
      }

      return null;
    }

    return parent && control.value === parent.get(matchTo)?.value
      ? null
      : { matching: true };
  };
}

@Component({
  selector: 'app-registerv2',
  templateUrl: './registerv2.component.html',
  styleUrls: ['./registerv2.component.scss'],
})
export class Registerv2Component {
  constructor(
    private builder: FormBuilder,
    private toaster: ToastrService,
    private authService: AuthService,
    private customerService: CustomerService,
    private toastr: ToastrService,
    private router: Router,
    private readonly translocoService: TranslocoService
  ) {
  }

  createform :FormGroup = this.builder.group({
    username: [
      '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(50)],
    ],
    password: [
      '',
      [
        Validators.required,
        // Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        // Validators.minLength(6),
        Validators.maxLength(25),
        matchValidator('confirmPassword', true),
      ],
    ],
    confirmPassword: ['', [Validators.required, matchValidator('password')]],
    email: ['', [Validators.required, Validators.email]],
    name: [
      '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(50)],
    ],
    nip: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    city: ['', Validators.required],
    cityCode: ['', Validators.required],
    template: ['first', Validators.required],
  });

  get password() {
    return this.createform.get('password');
  }
  get confirmPassword() {
    return this.createform.get('confirmPassword');
  }

  proceedRegistration(): void {
    this.createform.markAllAsTouched();
    if (this.createform.valid) {
      this.authService.proceedRegister(this.createform.value).subscribe(
        () => {
          this.toaster.success(
            this.translocoService.translate('toaster.toasterRegisterSuccessfully')
          );
          this.router.navigate(['login']);
        },
        () => {
          this.toaster.warning(
            this.translocoService.translate('toaster.toasterWrongCredit')
          );
        }
      );
    } else {
      this.toaster.warning(
        this.translocoService.translate('toaster.toasterWrongInputData')
      );
    }
  }
  getRegon() {
    this.customerService.getRegon(this.createform.value.nip).subscribe(
      (data) => {
        this.createform.patchValue({
          name: data.nazwa,
          nip: data.nip,
          city: data.ulica + ' ' + data.nrNieruchomosci,
          cityCode: data.kodPocztowy + ' ' + data.miejscowosc,
        });
        this.toastr.success(
          this.translocoService.translate('toaster.regonSuccess')
        );
      },
      (error) => {
        this.toastr.error(
          this.translocoService.translate('toaster.toasterFailed')
        );
      }
    );
  }
}
