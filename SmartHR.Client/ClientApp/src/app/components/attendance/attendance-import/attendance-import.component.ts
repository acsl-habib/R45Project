import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { throwError } from 'rxjs';
import { AttendanceImportModel } from '../../../models/data/attendance-import-model';
import { EmployeeModel } from '../../../models/data/employee-model';
import { NotifyService } from '../../../services/common/notify.service';
import { AttendanceService } from '../../../services/data/attendance.service';
import { EmployeeService } from '../../../services/data/employee.service';
import { ExcelService } from '../../../services/xlsx/excel.service';

@Component({
  selector: 'app-attendance-import',
  templateUrl: './attendance-import.component.html',
  styleUrls: ['./attendance-import.component.css']
})
export class AttendanceImportComponent implements OnInit {
  attendance: AttendanceImportModel = { employeeId: 0, inTime: new Date(), outTime: new Date() };
  importedTeendance: AttendanceImportModel[] = [];

  attendanceForm: FormGroup = new FormGroup({
    fileName: new FormControl(undefined, Validators.required)
  });
  //table
  dataSource: MatTableDataSource<AttendanceImportModel> = new MatTableDataSource(this.importedTeendance);
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  columnList: string[] = ["employeeId","employeeName", "inTime", "outTime"];

  //
  employees: EmployeeModel[] = [];
  constructor(
    private excelService: ExcelService,
    private employeeService: EmployeeService,
    private atttendanceService: AttendanceService,
    private datePipe: DatePipe,
    private notifyService: NotifyService
  ) { }
  getEmployeeName(id: number) {
    let obj = this.employees.find(x => x.employeeId == id);
    return obj?.employeeName ?? '';
  }
  get f() {
    return this.attendanceForm.controls;
  }
  importData() {
    const file = this.f.fileName.value.files[0];
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {

      const bstr: string = e.target.result;
      const data = <any[]>this.excelService.importFromFile(bstr);

      const header: string[] = Object.getOwnPropertyNames(this.attendance);
      const importedData = data.slice(1, -1);
      console.log(importedData);
      importedData.forEach(x => {
        this.importedTeendance.push({
          employeeId: Number(x[0]),
          inTime: new Date(x[1]),
          outTime: x[2] ? new Date(x[2]) : undefined
        })
      });
      console.log(this.importedTeendance[0].inTime?.toLocaleDateString());
      this.dataSource.data = this.importedTeendance;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

    };
    reader.readAsBinaryString(file);
  }
  saveImported() {
    let data: any[] = [];
    this.importedTeendance.forEach(x => {
      data.push({
        employeeId: x.employeeId,
        inTime: this.datePipe.transform(x.inTime, "yyyy-MM-dd HH:MM",'en-US'),
        outTime: x.outTime ? this.datePipe.transform(x.outTime, "yyyy-MM-dd HH:MM", 'en-US') : undefined
      });
    });
    console.log(data);
    this.atttendanceService.saveImported(data)
      .subscribe(r => {
        this.notifyService.success("Attendance save", "DISMISS");
      }, err => {
        this.notifyService.fail("Failed to save data", "DISMISS");
        throwError(err.error || err);
      });
  }
  ngOnInit(): void {
    this.employeeService.getEmployee()
      .subscribe(r => {
        this.employees = r;
        console.log(this.employees)
      }, err => {
        this.notifyService.fail("Can't fetch employee data", "DISMISS");
        throwError(err.error || err);
      });
  }

}
