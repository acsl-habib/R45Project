import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { throwError } from 'rxjs';
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
    private notifyService: NotifyService
  ) { }

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
