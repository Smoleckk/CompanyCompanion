import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../service/auth.service';
import { StepperOrientation, STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
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
  stepperOrientation: Observable<StepperOrientation>;

  constructor(private builder: FormBuilder, private toaster: ToastrService,
    private service: AuthService, private route: Router, breakpointObserver: BreakpointObserver) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }

  registerForm = this.builder.group({
    username: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required),
    email: this.builder.control('', Validators.required),

  })

  companyForm = this.builder.group({
    name: ['', Validators.required],
    nip: ['', Validators.required],
    city: ['', Validators.required],
    cityCode: ['', Validators.required],
  });

  formData = {
    username: this.registerForm.value.username,
    password: this.registerForm.value.password,
    email: this.registerForm.value.email,
    name: this.companyForm.value.name,
    nip: this.companyForm.value.nip,
    city: this.companyForm.value.city,
    cityCode: this.companyForm.value.cityCode
  };

  proceedregistration() {
    this.formData = {
      username: this.registerForm.value.username,
      password: this.registerForm.value.password,
      email: this.registerForm.value.email,
      name: this.companyForm.value.name,
      nip: this.companyForm.value.nip,
      city: this.companyForm.value.city,
      cityCode: this.companyForm.value.cityCode
    };
    if (this.registerForm.valid) {
      this.service.proceedRegister(this.formData).subscribe(res => {
        // console.log(this.formData);
        this.toaster.success('Please contact', 'Registered successfully')
        this.route.navigate(['login'])
      },
        () => {
          this.toaster.warning('Wrong credentials');
        })
    } else {
      this.toaster.warning('Please enter valid data');
    }
  }


}
