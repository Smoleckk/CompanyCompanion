import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hideMenu = true;

  loginform = this.builder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private builder: FormBuilder,
    private service: AuthService,
    private toaster: ToastrService,
    private route: Router
  ) {}

  ngOnInit(): void {
    localStorage.clear();
  }

  toggleMenu(): void {
    this.hideMenu = !this.hideMenu;
  }

  proceedLogin(): void {
    if (this.loginform.valid) {
      this.service.proceedLogin(this.loginform.value).subscribe(
        (result) => {
          if (result.message === 'Success' || result.success === true) {
            localStorage.setItem('token', result.data.jwtToken);
            this.toaster.success('Witamy w fakturio!');
            this.route.navigate(['']);
          } else {
            this.toaster.warning('Something went wrong, try again later.');
          }
        },
        () => {
          this.toaster.warning('Wrong credentials');
        }
      );
    }
  }
}
