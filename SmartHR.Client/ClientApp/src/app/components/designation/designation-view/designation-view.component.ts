import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { throwError } from 'rxjs';
import { ConfirmDialogComponent } from '../../../dialogs/confirm-dialog/confirm-dialog.component';
import { DesignationModel } from '../../../models/data/designation-model';
import { NotifyService } from '../../../services/common/notify.service';
import { DesignationService } from '../../../services/data/designation.service';

@Component({
  selector: 'app-designation-view',
  templateUrl: './designation-view.component.html',
  styleUrls: ['./designation-view.component.css']
})
export class DesignationViewComponent implements OnInit {
  //model
  designation: DesignationModel[] = [];

  //table
  dataSource: MatTableDataSource<DesignationModel> = new MatTableDataSource(this.designation);

  //paginator
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  //sort
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  // table column list
  columnList = ["designationName", "description", "employees" ,"actions"];
  constructor(
    private designationService: DesignationService,
    private notifyService: NotifyService,
    private dialog: MatDialog
  ) { }

  /*
   * Handlers
   * ========================================================
   */
  deleteDesignation(item: DesignationModel) {
    this.dialog.open(ConfirmDialogComponent, {
      width: '450px'
    }).afterClosed()
      .subscribe(r => {
        if (r) {
          this.designationService.deleteDesignation(Number(item.designationId))
            .subscribe(r => {
              this.dataSource.data = this.dataSource.data.filter(d => d.designationId != item.designationId);
              this.notifyService.success("Data deleted successfully", "DISMISS");
            }, err => {
              this.notifyService.fail("Failed to delete", "DISMISS");
              throwError(err.error || err);
            });
        }
      });
  }
  ngOnInit(): void {
    this.designationService.getDesignation()
      .subscribe(r => {
        this.designation = r;
        this.dataSource.data = this.designation;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, err => {
        this.notifyService.fail("Failded to load designation data", "DISMISS");
        throwError(err.error || err);
      })
  }

}
