import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserProfile } from 'src/app/models/userProfile';
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
    private toastrService: ToastrService
  ) {}
  ngOnInit(): void {
    this.SetEditInfo();
  }

  pageTitle = 'Profile';
  profileForm : FormGroup= this.builder.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    name: ['', Validators.required],
    nip: ['', Validators.required],
    city: ['', Validators.required],
    cityCode: ['', Validators.required],
  });

  SetEditInfo() {
    this.profileService.getProfile().subscribe((profile:UserProfile) => {
      if (profile != null) {
        this.profileForm.setValue({
          username: profile.username,
          email: profile.email,
          name: profile.name,
          nip: profile.nip,
          city: profile.city,
          cityCode: profile.cityCode,
        });
      }
    });
  }

  updateTemplateFirst() {
    if (confirm('Do you want to change your template?')) {
      this.profileService.updateProfile('first').subscribe((res) => {
        this.toastrService.success('Successfully updated template');
      });
    }
  }
  updateTemplateSecond() {
    if (confirm('Do you want to change your template?')) {
      this.profileService.updateProfile('second').subscribe((res) => {
        this.toastrService.success('Successfully updated template');
      });
    }
  }
}
