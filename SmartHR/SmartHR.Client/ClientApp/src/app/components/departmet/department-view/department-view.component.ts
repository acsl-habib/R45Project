import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { throwError } from 'rxjs';
import { ConfirmDialogComponent } from '../../../dialogs/confirm-dialog/confirm-dialog.component';
import { DepartmentModel } from '../../../models/data/department-model';
import { NotifyService } from '../../../services/common/notify.service';
import { DepartmentService } from '../../../services/data/department.service';

@Component({
  selector: 'app-department-view',
  templateUrl: './department-view.component.html',
  styleUrls: ['./department-view.component.css']
})
export class DepartmentViewComponent implements OnInit {
  /*
   * model data
   *
   * */
  departments: DepartmentModel[] = [];
  // Mat table
  dataSource: MatTableDataSource<DepartmentModel> = new MatTableDataSource(this.departments);
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  columnList = ["departmentName", "actions"];
  constructor(
    private departmentService: DepartmentService,
    private notifyService: NotifyService,
    private matDiagRef: MatDialog
  ) { }
  /*
   * Handlers
   *
   * */
  delete(item: DepartmentModel) {
    this.matDiagRef.open(ConfirmDialogComponent, {
      width: '450px'
    }).afterClosed()
      .subscribe(r => {
        if (r) {
          this.departmentService.delete(Number(item.departmentId))
            .subscribe(r => {
              this.notifyService.success("Data deleted", "DISMISS");
              this.dataSource.data = this.dataSource.data.filter(d => d.departmentId != item.departmentId);
            }, err => {
              this.notifyService.fail("Failed to delete", "DISMISS");
              throwError(err.error || err);
            });
        }
      })
  }
  ngOnInit(): void {
    this.departmentService.get()
      .subscribe(r => {
        this.departments = r;
        this.dataSource.data = this.departments;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }, err => {
        this.notifyService.fail("Failed to load departments", "DISMISS");
        throwError(err.error || err);
      });
  }

}
