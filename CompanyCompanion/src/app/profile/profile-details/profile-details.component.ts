import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProfileService } from 'src/app/service/profile.service';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss'],
})
export class ProfileDetailsComponent implements OnInit {
  constructor(
    private builder: FormBuilder,
    private profileService: ProfileService,
    private toastrService: ToastrService,
  ) {}
  ngOnInit(): void {
      this.SetEditInfo();
  }

  pageTitle = 'Profile';
  profileForm = this.builder.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    name: ['', Validators.required],
    nip: ['', Validators.required],
    city: ['', Validators.required],
    cityCode: ['', Validators.required],
  });

  SetEditInfo() {
    this.profileService.getProfile().subscribe((res) => {
      let editData: any;
      editData = res;
      if (editData != null) {
        this.profileForm.setValue({
          username: editData.username,
          email: editData.email,
          name: editData.name,
          nip: editData.nip,
          city: editData.city,
          cityCode: editData.cityCode,
        });
      }
    });
  }

  updateTemplateFirst(){
    if (confirm('Do you want to change your template?')) {
      this.profileService.updateProfile("first").subscribe((res) => {
        this.toastrService.success('Successfully updated template');
    })
    }
  }
  updateTemplateSecond(){
    if (confirm('Do you want to change your template?')) {
      this.profileService.updateProfile("second").subscribe((res) => {
        this.toastrService.success('Successfully updated template');
    })
    }
  }
}
