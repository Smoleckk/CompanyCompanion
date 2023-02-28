import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  constructor(private builder: FormBuilder, private toaster: ToastrService,
    private service: AuthService, private route: Router) {
  }

  registerform = this.builder.group({
    username: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required)
  })

  proceedregistration() {
    if (this.registerform.valid) {
      this.service.proceedRegister(this.registerform.value).subscribe(res => {
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
