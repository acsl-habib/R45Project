import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { EmployeeModel } from '../../../models/data/employee-model';
import { GradeModel } from '../../../models/data/grade-model';
import { EmployeeViewModel } from '../../../models/data/viewmodel/employee-view-model';
import { NotifyService } from '../../../services/common/notify.service';
import { DesignationService } from '../../../services/data/designation.service';
import { EmployeeService } from '../../../services/data/employee.service';


@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  employee: EmployeeViewModel = {};
  constructor(
    private employeeService: EmployeeService,
    private designationService: DesignationService,
    private actvatedRoute: ActivatedRoute,
    private notifyService: NotifyService,
  ) { }
  
  ngOnInit(): void {

    // fetch employee data with id
    let id: number = this.actvatedRoute.snapshot.params.id;
    this.employeeService.getEmployeeById(id).
      subscribe(r => {
        this.employee = r;
        console.log(this.employee);
      }, err => {
        this.notifyService.fail("Faild to load employee data", "Close");
        throwError(err.error || err);
      });
    this.designationService.getDesignation()
      .subscribe(r => {
        
      }, err => {

      })
  }
}
