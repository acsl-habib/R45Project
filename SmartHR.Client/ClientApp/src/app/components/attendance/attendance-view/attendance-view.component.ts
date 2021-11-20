import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AttendanceImportModel } from '../../../models/data/attendance-import-model';
import { EmployeeModel } from '../../../models/data/employee-model';
import { DateRangeInputModel } from '../../../models/data/inputmodel/date-range-input-model';
import { AttendanceService } from '../../../services/data/attendance.service';
import { EmployeeService } from '../../../services/data/employee.service';

@Component({
  selector: 'app-attendance-view',
  templateUrl: './attendance-view.component.html',
  styleUrls: ['./attendance-view.component.css']
})
export class AttendanceViewComponent implements OnInit {
  attendances: AttendanceImportModel[] = [];
  dateForm: FormGroup = new FormGroup({
    dateFrom: new FormControl(undefined, Validators.required),
    dateTo: new FormControl(undefined)
  });
  dataSource: MatTableDataSource<AttendanceImportModel> = new MatTableDataSource(this.attendances);
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  columnList: string[] = ["employeeId", "employeeName", "inTime", "outTime"];

  //
  employees: EmployeeModel[] = [];
  constructor(
    private attendanceService: AttendanceService,
    private employeeService: EmployeeService,
    private datePipe: DatePipe
  ) { }
  get f() {
    return this.dateForm.controls;
  }
  getEmployeeName(id: number) {
    let obj = this.employees.find(x => x.employeeId == id);
    return obj?.employeeName ?? '';
  }
  loadAttendances() {
    let data: DateRangeInputModel = {
      dateFrom: <string>this.datePipe.transform( this.f.dateFrom.value, "yyyy-MM-dd")

    }
    if (this.f.dateTo.value != '') data.dateTo= <string>this.datePipe.transform(this.f.dateTo.value, "yyyy-MM-dd")
    console.log(data);
    this.attendanceService.getAttendancesOfDataRange(data)
      .subscribe(r => {
        this.attendances = r;
        console.log(this.attendances);
        this.dataSource.data = this.attendances;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
        err => { });
  }
  ngOnInit(): void {
    this.employeeService.get()
      .subscribe(r => {
        this.employees = r;
        console.log(this.employees)
      }, err => {

      });
  }

}
