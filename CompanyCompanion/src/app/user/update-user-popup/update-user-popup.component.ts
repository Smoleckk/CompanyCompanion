import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-update-user-popup',
  templateUrl: './update-user-popup.component.html',
  styleUrls: ['./update-user-popup.component.scss'],
})
export class UpdateUserPopupComponent implements OnInit {
  constructor(
    private builder: FormBuilder,
    private service: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService,
    private dialog: MatDialogRef<UpdateUserPopupComponent>
  ) {}
  ngOnInit(): void {
    if (this.data.username != null && this.data.username != '') {
      this.service.getByName(this.data.username).subscribe((editdata) => {
        this.updateform.setValue({ username: editdata.username });
      });
    }
  }

  fields = [
    {
      label: 'Username',
      controlName: 'username',
      type: 'text',
      cssStyle: 'full-width',
    },
  ];

  updateform = this.builder.group({
    username: this.builder.control('', Validators.required),
  });

  updateuser() {
    if (this.updateform.valid) {
      this.service
        .updateUser(this.updateform.value.username, this.updateform.value)
        .subscribe(() => {
          this.toastr.success('Ipdated successfully');
          this.dialog.close();
        });
    } else {
      this.toastr.warning('Please check data');
    }
  }
}
