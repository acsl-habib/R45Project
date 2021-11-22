import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { DepartmentModel } from '../../../models/data/department-model';
import { EmployeeModel } from '../../../models/data/employee-model';
import { GradeModel } from '../../../models/data/grade-model';
import { SectionModel } from '../../../models/data/section-model';
import { NotifyService } from '../../../services/common/notify.service';
import { DepartmentService } from '../../../services/data/department.service';
import { DesignationService } from '../../../services/data/designation.service';
import { GradeService } from '../../../services/data/grade.service';
import { SectionService } from '../../../services/data/section.service';

@Component({
  selector: 'app-designation-employee',
  templateUrl: './designation-employee.component.html',
  styleUrls: ['./designation-employee.component.css']
})
export class DesignationEmployeeComponent implements OnInit {


  //model data
  employees: EmployeeModel[] = [];
  //data
  grades: GradeModel[] = [];
  sections: SectionModel[] = [];
  departments: DepartmentModel[] = [];
  //tables
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  columnList: string[] = ["picture","employeeName", "phone", "email", "joiningDate", "department", "grade"];
  dataSource: MatTableDataSource<EmployeeModel> = new MatTableDataSource<EmployeeModel>(this.employees);
  constructor(
    private gradeService: GradeService,
    private designationService: DesignationService,
    private sectionService: SectionService,
    private departmentService: DepartmentService,
    private notifyService: NotifyService,
    private activatedRoute: ActivatedRoute
  ) { }
  getSection(element: EmployeeModel) {
    var section = this.sections.find(x => x.sectionId == element.sectionId);
    return section?.sectionName ?? ''
  }
  getDepartment(element: EmployeeModel) {
    var section = this.sections.find(x => x.sectionId == element.sectionId);
    if (section) {
      var dept = this.departments.find(x => x.departmentId == section?.departmentId);
      return dept?.departmentName ?? '';
    }
    return '';
  }
  getGrade(element: EmployeeModel) {
    var grade = this.grades.find(x => x.gradeId == element.currentGradeId);
    return grade?.gradeName ?? ''
  }
  ngOnInit(): void {
    let id: number = this.activatedRoute.snapshot.params.id;
    this.designationService.getEmployees(id)
      .subscribe(r => {
        this.employees = r;
        console.log(this.employees);
        console.log(r);
        this.dataSource.data = this.employees;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }, err => {
        this.notifyService.fail("Failed to load employees", "DISMISS");
        throwError(err.error || err);
      });
    this.gradeService.get()
      .subscribe(r => {
        this.grades = r;
      }, err => {
        this.notifyService.fail("Failed to load grades", "DISMISS");
        throwError(err.error || err);
      });
    this.sectionService.get()
      .subscribe(r => {
        this.sections = r;
      }, err => {
        this.notifyService.fail("Failed to load sections", "DISMISS");
        throwError(err.error || err);
      });
    this.departmentService.getDepartment()
      .subscribe(r => {
        this.departments = r;
      }, err => {
        this.notifyService.fail("Failed to load department", "DISMISS");
        throwError(err.error || err);
      });
  }
}
