import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../service/auth.service';
import {
  StepperOrientation,
  STEPPER_GLOBAL_OPTIONS,
} from '@angular/cdk/stepper';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class RegisterComponent {
  registerForm: any;
  companyForm: any;
  stepperOrientation: Observable<StepperOrientation>;
  formData: any = {};

  constructor(
    private fb: FormBuilder,
    private toaster: ToastrService,
    private service: AuthService,
    private router: Router,
    breakpointObserver: BreakpointObserver
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
    this.buildForms();
  }

  private buildForms(): void {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
    });
    this.companyForm = this.fb.group({
      name: ['', Validators.required],
      nip: ['', Validators.required],
      city: ['', Validators.required],
      cityCode: ['', Validators.required],
    });
  }

  private prepareFormData(): void {
    this.formData = {
      username: this.registerForm.value.username,
      password: this.registerForm.value.password,
      email: this.registerForm.value.email,
      name: this.companyForm.value.name,
      nip: this.companyForm.value.nip,
      city: this.companyForm.value.city,
      cityCode: this.companyForm.value.cityCode,
    };
  }

  proceedRegistration(): void {
    this.prepareFormData();
    if (this.registerForm.valid) {
      this.service.proceedRegister(this.formData).subscribe(
        () => {
          this.toaster.success(
            'Registered successfully. Please contact',
            'Success'
          );
          this.router.navigate(['login']);
        },
        () => {
          this.toaster.warning('Wrong credentials');
        }
      );
    } else {
      this.toaster.warning('Please enter valid data');
    }
  }
}
