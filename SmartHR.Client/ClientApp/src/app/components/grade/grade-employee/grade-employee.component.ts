import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { DepartmentModel } from '../../../models/data/department-model';
import { DesignationModel } from '../../../models/data/designation-model';
import { EmployeeModel } from '../../../models/data/employee-model';
import { SectionModel } from '../../../models/data/section-model';
import { EmployeeViewModel } from '../../../models/data/viewmodel/employee-view-model';
import { NotifyService } from '../../../services/common/notify.service';
import { DepartmentService } from '../../../services/data/department.service';
import { DesignationService } from '../../../services/data/designation.service';
import { GradeService } from '../../../services/data/grade.service';
import { SectionService } from '../../../services/data/section.service';

@Component({
  selector: 'app-grade-employee',
  templateUrl: './grade-employee.component.html',
  styleUrls: ['./grade-employee.component.css']
})
export class GradeEmployeeComponent implements OnInit {
  //model data
  employees: EmployeeModel[] = [];
  //data
  designations: DesignationModel[] = [];
  sections: SectionModel[] = [];
  departments: DepartmentModel[] = [];
  //tables
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  columnList: string[] = ["picture", "employeeName", "phone", "email", "joiningDate", "department", "designation"];
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
  getdesignation(element: EmployeeModel) {
    var designation = this.designations.find(x => x.designationId == element.currentDesignationId);
    return designation?.designationName ?? ''
  }
  ngOnInit(): void {
    let id: number = this.activatedRoute.snapshot.params.id;
    this.gradeService.getEmployees(id)
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
    this.designationService.getDesignation()
      .subscribe(r => {
        this.designations = r;
      }, err => {
        this.notifyService.fail("Failed to load designations", "DISMISS");
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
        this.notifyService.fail("Failed to load sections", "DISMISS");
        throwError(err.error || err);
      });
  }

}
