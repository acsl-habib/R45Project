import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { throwError } from 'rxjs';
import { ConfirmDialogComponent } from '../../../dialogs/confirm-dialog/confirm-dialog.component';
import { DepartmentModel } from '../../../models/data/department-model';
import { DesignationModel } from '../../../models/data/designation-model';
import { EmployeeModel } from '../../../models/data/employee-model';
import { GradeModel } from '../../../models/data/grade-model';
import { SectionModel } from '../../../models/data/section-model';
import { NotifyService } from '../../../services/common/notify.service';
import { DepartmentService } from '../../../services/data/department.service';

import { DesignationService } from '../../../services/data/designation.service';
import { EmployeeService } from '../../../services/data/employee.service';
import { GradeService } from '../../../services/data/grade.service';


@Component({
  selector: 'app-employee-view',
  templateUrl: './employee-view.component.html',
  styleUrls: ['./employee-view.component.css']
})
export class EmployeeViewComponent implements OnInit {

  /*
  * model data
  *
  * */
  employees: EmployeeModel[] = [];
  departments: DepartmentModel[] = [];
  section: SectionModel[] = [];
  designations: DesignationModel[] = [];
  grades: GradeModel[] = [];

  // for enum
  
  // Mat table
  dataSource: MatTableDataSource<EmployeeModel> = new MatTableDataSource(this.employees);
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  columnList = [
    "picture", "employeeName",
     "phone", "email",
    "joiningDate", "employeeStatus",
    "currentGradeId", "currentDesignationId", "sectionId","personalInfo","actions"
  ];
  constructor(
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private designationService: DesignationService,
    private gradeService: GradeService,
    private notifyService: NotifyService,
    private dialog: MatDialog
  ) { }
  /*
   * Handlers
   *
   * */
 
  getSectionName(id: number): string | undefined {
    let sName = this.section.find(s => s.sectionId == id);
    return sName ? sName.sectionName : "";
  }
  getDesignationName(id:number): string | undefined {
    let desigName = this.designations.find(d => d.designationId ==id);
    return desigName ? desigName.designationName : "";
  }
  getGradeName(id: number): string | undefined {
    let gradeName = this.grades.find(d => d.gradeId == id);
    return gradeName ? gradeName.gradeName : "";
  }
  //for delete
  confirmDelete(item: EmployeeModel) {
    this.dialog.open(ConfirmDialogComponent, {
      width: '450px'
    }).afterClosed()
      .subscribe(r => {
        if (r) {
          this.employeeService.deleteEmployee(Number(item.employeeId))
            .subscribe(r => {
              this.dataSource.data = this.dataSource.data.filter(e => e.employeeId != item.employeeId);
              this.notifyService.success("Data deleted successfully", "DISMISS");
            }, err => {
              this.notifyService.fail("Failed to delete", "DISMISS");
              throwError(err.error || err);
            });
          
        }
      })
  }

  
  ngOnInit(): void {

    this.designationService.getDesignation()
      .subscribe(r => {
        this.designations = r;
      }, err => {
        throwError(err.error || err);
        this.notifyService.fail("Failed to load designation", "DISMISS");
      });
    this.gradeService.get()
      .subscribe(r => {
        this.grades = r;
      }, err => {
        throwError(err.error || err);
        this.notifyService.fail("Failed to load grade", "DISMISS");
      });
    this.departmentService.getSection()
      .subscribe(r => {
        this.section = r;
      }, err => {
        throwError(err.error || err);
        this.notifyService.fail("Failed to load section", "DISMISS");
      });
    this.employeeService.getEmployee()
      .subscribe(r => {
        this.employees = r;
        console.log(this.employees);
        this.dataSource.data = this.employees;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }, err => {
        this.notifyService.fail("Failed to load employees", "DISMISS");
        throwError(err.error || err);
      });
  }
}
