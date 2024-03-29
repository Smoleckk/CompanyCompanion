import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslocoService } from '@ngneat/transloco';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-create-popup',
  templateUrl: './user-create-popup.component.html',
  styleUrls: ['./user-create-popup.component.scss'],
})
export class UserCreatePopupComponent {
  constructor(
    private builder: FormBuilder,
    private service: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService,
    private readonly translocoService: TranslocoService,
    private dialog: MatDialogRef<UserCreatePopupComponent>
  ) {}
  ngOnInit(): void {}

  fields = [
    {
      label: this.translocoService.translate('userFormHeader.username'),
      controlName: 'username',
      type: 'text',
      cssStyle: 'full-width',
    },
    {
      label: this.translocoService.translate('userFormHeader.email'),
      controlName: 'email',
      type: 'email',
      cssStyle: 'full-width',
    },
    {
      label: this.translocoService.translate('userFormHeader.password'),
      controlName: 'password',
      type: 'password',
      cssStyle: 'full-width',
    },
  ];

  createform: FormGroup = this.builder.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  SaveUser() {
    if (this.createform.valid) {
      this.service.createUser(this.createform.value).subscribe(() => {
        this.toastr.success(
          this.translocoService.translate('toaster.toasterCreatedSuccess')
        );
        this.dialog.close();
      });
    } else {
      this.toastr.warning(
        this.translocoService.translate('toaster.toasterWrongInputData')
      );
    }
  }
}
