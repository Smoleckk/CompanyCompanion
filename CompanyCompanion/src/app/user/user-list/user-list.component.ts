import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../../service/user.service';
import { UpdateUserPopupComponent } from '../update-user-popup/update-user-popup.component';
import { UserCreatePopupComponent } from '../user-create-popup/user-create-popup.component';
import { User } from '../../models/user';
import { ToastrService } from 'ngx-toastr';
import { ProfileService } from 'src/app/service/profile.service';
import { TranslocoService } from '@ngneat/transloco';
import { UserProfile } from 'src/app/models/userProfile';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private service: UserService,
    private dialog: MatDialog,
    private toastrService: ToastrService,
    private profileService: ProfileService,
    private readonly translocoService: TranslocoService,
  ) {}
  dataSource: any;

  displayedColumns: string[] = ['username', 'email', 'action'];
  columns: any = [
    {
      matColumnDef: 'username',
      matHeaderCellDef: this.translocoService.translate('userTableHeader.username'),
      matCellDef: 'username',
    },
    {
      matColumnDef: 'email',
      matHeaderCellDef: this.translocoService.translate('userTableHeader.email'),
      matCellDef: 'email',
    }
  ];
  actionButtons = [
    {
      color: 'warn',
      icon: 'delete',
      function: (element: any) => this.removeUser(element.email),
    },
    // {
    //   color: 'primary',
    //   icon: 'edit',
    //   function: (element: any) => this.updateUser(element.email),
    // },
  ];

  ngOnInit(): void {
    this.loadUsers();
    this.onResize();
    window.addEventListener('resize', () => {
      this.onResize();
    });
  }

  onResize() {
    if (window.innerWidth <= 850) {
      this.displayedColumns = ['username', 'email', 'action'];
    } else {
      this.displayedColumns = ['username', 'email', 'action'];
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  loadUsers():void {
    this.service.loadUsers().subscribe((userdata:User[]) => {
      this.profileService.getProfile().subscribe((profile:UserProfile) => {
        if (profile != null) {
          userdata = userdata.filter((u: User) => u.username !== profile.username);
          this.dataSource = new MatTableDataSource(userdata);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      });
    });
  }
  
  updateUser(username: any) {
    const popup = this.dialog.open(UpdateUserPopupComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '500ms',
      width: '40%',
      data: {
        usercode: username,
      },
    });

    popup.afterClosed().subscribe(() => {
      this.loadUsers();
    });
  }
  createUser() {
    const popup = this.dialog.open(UserCreatePopupComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '500ms',
      width: '700px',
    });
    popup.afterClosed().subscribe(() => {
      this.loadUsers();
    });
  }
  removeUser(code: any): void {
    if (confirm('Do you want to remove this User: ' + code)) {
      this.service.deleteUser(code).subscribe(() => {
        this.toastrService.success(this.translocoService.translate('toaster.toasterDeletedSuccess'));
        this.loadUsers();
      });
    }
  }
}
