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

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  constructor(
    private service: UserService,
    private dialog: MatDialog,
    private toastrService: ToastrService
  ) {
    this.loadUsers();
  }
  userdata: any;
  dataSource: any;
  // displayedColumns: string[] = ['username', 'email'];
  displayedColumns: string[] = ['username', 'email', 'action'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
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

  loadUsers() {
    this.service.loadUsers().subscribe((data) => {
      this.userdata = data;
      this.dataSource = new MatTableDataSource(this.userdata);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  UpdateUser(username: any) {
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
        this.toastrService.success('Deleted successfully', 'Remove User');
        this.loadUsers();
      });
    }
  }
}
