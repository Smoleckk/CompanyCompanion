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
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hideMenu = true;

  loginform: FormGroup = this.builder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private builder: FormBuilder,
    private service: AuthService,
    private toaster: ToastrService,
    private route: Router,
    private readonly translocoService: TranslocoService
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
            this.toaster.success(
              this.translocoService.translate('toaster.toasterWelcome')
            );
            this.route.navigate(['']);
          } else {
            this.toaster.warning(
              this.translocoService.translate('toaster.toasterFailed')
            );
          }
        },
        () => {
          this.toaster.warning(
            this.translocoService.translate('toaster.toasterWrongCredit')
          );
        }
      );
    }
  }
}
