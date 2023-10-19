import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from 'src/app/service/customer.service';
import { AuthService } from '../../service/auth.service';

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
    private router: Router
  ) {}

  createform = this.builder.group({
    username: ['', [Validators.required,Validators.minLength(2), Validators.maxLength(50)]],
    password: ['', Validators.required],
    email: ['', [Validators.required,Validators.email]],
    name: ['', [Validators.required,Validators.minLength(2), Validators.maxLength(50)]],
    nip: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    city: ['', Validators.required],
    cityCode: ['', Validators.required],
    template: ['first', Validators.required],
  });
  // username: ['', Validators.required],
  // password: ['', Validators.required],
  // email: ['', Validators.required],
  // name: ['', Validators.required],
  // city: ['', Validators.required],
  // cityCode: ['', Validators.required],
  proceedRegistration(): void {
    if (this.createform.valid) {
      this.authService.proceedRegister(this.createform.value).subscribe(
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
  getRegon() {
    this.customerService.getRegon(this.createform.value.nip).subscribe(
      (data) => {
        this.createform.patchValue({
          name: data.nazwa,
          nip: data.nip,
          city: data.ulica + ' ' + data.nrNieruchomosci,
          cityCode: data.kodPocztowy + ' ' + data.miejscowosc,
        });
        this.toastr.success('Super, udało się uzupełnić podmiot');
        console.log(data);
      },
      (error) => {
        this.toastr.error(error.error);
      }
    );
  }
}
