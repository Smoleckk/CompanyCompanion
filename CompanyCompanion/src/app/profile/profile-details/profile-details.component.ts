import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProfileService } from 'src/app/service/profile.service';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss'],
})
export class ProfileDetailsComponent implements OnInit {
  constructor(
    private builder: FormBuilder,
    private profileService: ProfileService
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
}
