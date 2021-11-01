import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { EmployeeModel } from '../../../models/data/employee-model';
import { EmployeeViewModel } from '../../../models/data/viewmodel/employee-view-model';
import { NotifyService } from '../../../services/common/notify.service';
import { GradeService } from '../../../services/data/grade.service';

@Component({
  selector: 'app-grade-employee',
  templateUrl: './grade-employee.component.html',
  styleUrls: ['./grade-employee.component.css']
})
export class GradeEmployeeComponent implements OnInit {
  //model data
  employees: EmployeeViewModel[] = [];
  //tables
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  columnList: string[] = ["employeeName", "department"];
  dataSource: MatTableDataSource<EmployeeModel> = new MatTableDataSource < EmployeeModel>(this.employees);
  constructor(
    private gradeService: GradeService,
    private notifyService: NotifyService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    let id: number = this.activatedRoute.snapshot.params.id;
    this.gradeService.getEmployees(id)
      .subscribe(r => {
        this.employees = r;
        console.log(this.employees[0].section?.department?.departmentName)
        this.dataSource.data = this.employees;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }, err => {
        this.notifyService.fail("Failed to load employees", "DISMISS");
        throwError(err.error || err);
      })
  }

}
