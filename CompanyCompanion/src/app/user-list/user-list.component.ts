import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../service/user.service';
import { UpdateUserPopupComponent } from '../update-user-popup/update-user-popup.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  constructor(private service: UserService, private dialog: MatDialog) {
    this.LoadUsers();
  }
  userdata: any;
  dataSource: any;
  displayedColumns: string[] = ['username', 'password', 'action'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
  }

  LoadUsers() {
    this.service.LoadUsers().subscribe(data => {
      this.userdata = data;
      this.dataSource = new MatTableDataSource(this.userdata);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
  UpdateUser(username: any) {
    const popup = this.dialog.open(UpdateUserPopupComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '500ms',
      width: '50%',
      data: {
        usercode: username
      }
    })

    popup.afterClosed().subscribe(() => {
      this.LoadUsers();
    })
  }
}
