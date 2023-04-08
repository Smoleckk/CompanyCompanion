import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
    private dialog: MatDialogRef<UserCreatePopupComponent>
  ) {}

  editdata: any;
  ngOnInit(): void {}

  createform = this.builder.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  SaveUser() {
    if (this.createform.valid) {
      this.service.createUser(this.createform.value).subscribe(() => {
        this.toastr.success('Created successfully');
        this.dialog.close();
      });
    } else {
      this.toastr.warning('Please check data');
    }
  }
}
