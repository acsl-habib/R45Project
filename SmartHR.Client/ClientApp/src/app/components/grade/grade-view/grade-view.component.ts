import { DecimalPipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { throwError } from 'rxjs';
import { ConfirmDialogComponent } from '../../../dialogs/confirm-dialog/confirm-dialog.component';
import { CalculationType } from '../../../models/data/constants/enum-data';
import { GradeModel } from '../../../models/data/grade-model';
import { SalaryHeadModel } from '../../../models/data/salary-head-model';
import { NotifyService } from '../../../services/common/notify.service';
import { GradeService } from '../../../services/data/grade.service';
import { SalaryHeadService } from '../../../services/data/salary-head.service';

@Component({
  selector: 'app-grade-view',
  templateUrl: './grade-view.component.html',
  styleUrls: ['./grade-view.component.css']
})
export class GradeViewComponent implements OnInit {

  //model
  grades: GradeModel[] = [];

  salaryHeads: SalaryHeadModel[] = [];
  //mat table
  dataSource: MatTableDataSource<GradeModel> = new MatTableDataSource(this.grades);
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  columnList: string[] = ["gradeName", "basic", "salaryStructure", "employees",  "actions"];
  constructor(
    private decimalPipe: DecimalPipe,
    private gradeService: GradeService,
    public salaryHeadSerice: SalaryHeadService,
    private notifyService: NotifyService,
    private dialog: MatDialog
  ) { }
  /*
   * Methods
   *
   * */

  // delete method
  deleteGrade(item: GradeModel) {
    this.dialog.open(ConfirmDialogComponent, {
      width: '450px'
    }).afterClosed()
      .subscribe(r => {
        if (r) {
          this.gradeService.delete(Number(item.gradeId))
            .subscribe(r => {
              this.notifyService.success("Data deleted", "DISMISS");
              this.dataSource.data = this.dataSource.data.filter(d => d.gradeId != item.gradeId);
              this.notifyService.success("Data deleted successfully", "DISMISS");
            }, err => {
              this.notifyService.fail("Failed to delete", "DISMISS");
              throwError(err.error || err);
            });
        }
      });
  }
  getSalaryStructures(g: GradeModel) {
    let data: { label: string, value: string }[] = [];
    g.salaryStructures.forEach(x => {
      let st = this.salaryHeads.find(v => v.salaryHeadId == x.salaryHeadId);
      if (x.valueCalculationType == CalculationType.Flat) {
        data.push({ label: <string>st?.salaryHeadName, value: <string>this.decimalPipe.transform( < number > x.headValue, "1.2-2") })
      }
      else {
        data.push({ label: <string>st?.salaryHeadName, value: <string>this.decimalPipe.transform(<number>g.basic*(<number>x.headValue / 100.00), "1.2-2") })
      }
    });
    let temp = data.map(x => `${x.label}: ${x.value}`)
    return temp.join(', ');
  }
  /*
   * Life cycle event
   *
   * */
  ngOnInit(): void {
    this.gradeService.getInclude()
      .subscribe(r => {
        console.log(r);
        this.grades = r;
        this.dataSource.data = this.grades;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }, err => {
        this.notifyService.fail("Failed to load grades", "DISMISS");
        throwError(err.error || err);
      });
    this.salaryHeadSerice.get()
      .subscribe(r => {
        this.salaryHeads = r;
      }, err => {
        this.notifyService.fail("Failed to load salary heads", "DISMISS");
        throwError(err.error || err);
      })
  }

}
