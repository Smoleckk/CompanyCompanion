import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-update-user-popup',
  templateUrl: './update-user-popup.component.html',
  styleUrls: ['./update-user-popup.component.scss']
})
export class UpdateUserPopupComponent implements OnInit {

  constructor(private builder: FormBuilder, private service: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any, private toastr: ToastrService,
    private dialog:MatDialogRef<UpdateUserPopupComponent>) {
  }

  editdata: any;
  ngOnInit(): void {
    if (this.data.username != null && this.data.username != '') {
      this.service.GetByName(this.data.username).subscribe(res => {
        this.editdata = res;
        this.updateform.setValue({ username: this.editdata.username })
      })
    }
  }

  updateform = this.builder.group({
    username: this.builder.control('', Validators.required)
  })
  updateuser() {
    if (this.updateform.valid) {
      this.service.updateuser(this.updateform.value.username, this.updateform.value).subscribe(() => {
        this.toastr.success('Ipdated successfully');
        this.dialog.close()
      })
    } else {
      this.toastr.warning('Please check data')
    }
  }
}
