import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { throwError } from 'rxjs';
import { EmployeeModel } from '../../models/data/employee-model';
import { GradeModel } from '../../models/data/grade-model';
import { SalaryPayModel } from '../../models/data/salary-pay-model';
import { SalaryViewModel } from '../../models/data/viewmodel/salary-view-model';
import { NotifyService } from '../../services/common/notify.service';
import { EmployeeService } from '../../services/data/employee.service';
import { GradeService } from '../../services/data/grade.service';
import { SalaryService } from '../../services/data/salary.service';

@Component({
  selector: 'app-salary-view',
  templateUrl: './salary-view.component.html',
  styleUrls: ['./salary-view.component.css']
})
export class SalaryViewComponent implements OnInit {
  //model
  salary: SalaryViewModel[] = [];
  emp: EmployeeModel[] = [];
  grades: GradeModel[] = [];
  constructor(
    private salaryService: SalaryService,
    private employeeService: EmployeeService,
    private gradeService:GradeService,
    private notifyService: NotifyService,
    private datePipe: DatePipe
  ) { }
  dataSource: MatTableDataSource<SalaryViewModel> = new MatTableDataSource(this.salary);
  columnList = ["employeeName", "grade", "designation","year","month","basic","hr","ma","ta","da","grossSalary","tax","deduction","netSalary"];
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  //
  isSaved: boolean = false
  payDate!: Date;
  private date = new Date();
  firstDay:Date = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
  lastDay: Date = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0);

  get firstDate() {
    return this.datePipe.transform(this.firstDay, "yyyy-MM-dd")
  }
  get lastDate() {
    return this.datePipe.transform(this.lastDay, "yyyy-MM-dd")
  }
  save() {
    let data: SalaryPayModel = {
      year: this.firstDay.getFullYear(),
      month: this.firstDay.getMonth()+1,
      paymentDate: <string>this.datePipe.transform(new Date(), "yyyy-MM-dd")
    }
    this.salaryService.save(data)
      .subscribe(r => {
        this.payDate = new Date(<string>r.paymentDate?.toLocaleString());
        this.isSaved = true;
        console.log(r);
      }, err => {
        this.notifyService.fail("Failed to save salary", "DISMISS");
        throwError(err.error || err);
      });
  }
  pre() {
    
    this.firstDay = new Date(this.firstDay.getFullYear(), this.firstDay.getMonth() - 1, 1);
    this.lastDay = new Date(this.firstDay.getFullYear(), this.firstDay.getMonth() + 1, 0);
    this.loadPayStatus();
  }
  next() {
    this.firstDay = new Date(this.firstDay.getFullYear(), this.firstDay.getMonth() + 1, 1);
    this.lastDay = new Date(this.firstDay.getFullYear(), this.firstDay.getMonth() + 1, 0);
    this.loadPayStatus();
  }
  loadPayDate() {
    this.salaryService.getPayDate(this.firstDay.getFullYear(), this.firstDay.getMonth()+1)
      .subscribe(r => {
        this.payDate = r;
        console.log(r);
      }, err => {
        this.notifyService.fail("Failed to load salary pay date", "DISMISS");
        throwError(err.error || err);
      });
  }
  loadPayStatus() {
    this.salaryService.IsSaved(this.firstDay.getFullYear(), this.firstDay.getMonth()+1)
      .subscribe(r => {
        this.isSaved = r;
        this.loadPayDate();
      }, err => {
        this.notifyService.fail("Failed to load salary status", "DISMISS");
        throwError(err.error || err);
      })
  }
  ngOnInit(): void {
    this.salaryService.get()
      .subscribe(r => {
        this.salary = r;
        this.dataSource.data = this.salary;
        this.dataSource.paginator = this.paginator;
        console.log(this.salary.values());
      }, err => {
        this.notifyService.fail("Failed to load salary", "DISMISS");
        throwError(err.error || err);
      });
    this.loadPayStatus();
  }

}
