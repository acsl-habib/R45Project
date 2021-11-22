import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { throwError } from 'rxjs';
import { ConfirmDialogComponent } from '../../../dialogs/confirm-dialog/confirm-dialog.component';
import { SalaryHeadModel } from '../../../models/data/salary-head-model';
import { NotifyService } from '../../../services/common/notify.service';
import { SalaryHeadService } from '../../../services/data/salary-head.service';

@Component({
  selector: 'app-salary-head-view',
  templateUrl: './salary-head-view.component.html',
  styleUrls: ['./salary-head-view.component.css']
})
export class SalaryHeadViewComponent implements OnInit {
  //model
  salaryHeads: SalaryHeadModel[] = [];
  //mat table
  dataSource: MatTableDataSource<SalaryHeadModel> = new MatTableDataSource(this.salaryHeads);
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  columnList: string[] = ["salaryHeadName", "description", "isCommon", "actions"];
  constructor(
    
    private salaryHeadService: SalaryHeadService,
    private notifyService: NotifyService,
    private dialog: MatDialog
  ) { }
  // delete method
  deleteSalaryHead(item: SalaryHeadModel) {
    this.dialog.open(ConfirmDialogComponent, {
      width: '450px'
    }).afterClosed()
      .subscribe(r => {
        if (r) {
          this.salaryHeadService.delete(Number(item.salaryHeadId))
            .subscribe(r => {
              this.notifyService.success("Data deleted", "DISMISS");
              this.dataSource.data = this.dataSource.data.filter(d => d.salaryHeadId != item.salaryHeadId);
              this.notifyService.success("Data deleted successfully", "DISMISS");
            }, err => {
              this.notifyService.fail("Failed to delete", "DISMISS");
              throwError(err.error || err);
            });
        }
      });
  }
  ngOnInit(): void {
    this.salaryHeadService.get()
      .subscribe(r => {
        this.salaryHeads = r;
        this.dataSource.data = this.salaryHeads;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }, err => {
        this.notifyService.fail("Failed to load salary heads", "DISMISS");
        throwError(err.error || err);
      });
  }

}
