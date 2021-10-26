import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { throwError } from 'rxjs';
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
    private gradeService: GradeService,
    public salaryHeadSerice: SalaryHeadService,
    private notifyService: NotifyService
  ) { }
  /*
   * Methods
   *
   * */
  getSalaryStructures(g: GradeModel) {
    
    let data: { label: string, value: number }[] = [];
    g.salaryStructures.forEach(x => {
      let st = this.salaryHeads.find(v => v.salaryHeadId == x.salaryHeadId);
      if (x.valueCalculationType == CalculationType.Flat) {
        data.push({ label: <string>st?.salaryHeadName, value: <number>x.headValue })
      }
      else {
        data.push({ label: <string>st?.salaryHeadName, value: <number>g.basic*(<number>x.headValue / 100.00) })
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
