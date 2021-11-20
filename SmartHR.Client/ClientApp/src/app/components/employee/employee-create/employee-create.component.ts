import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Gender } from '../../../models/data/constants/enum-data';
import { EmployeeModel } from '../../../models/data/employee-model';
import { NotifyService } from '../../../services/common/notify.service';
import { DepartmentService } from '../../../services/data/department.service';
import { EmployeeService } from '../../../services/data/employee.service';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit {
  genderOptions: { label: string, value: number }[] = [];
  //Model
  emplyee: EmployeeModel = {};
  employeeForm: FormGroup = new FormGroup({
    employeeName: new FormControl('', [Validators.required, Validators.maxLength(40)]),
    dateOfBirth: new FormControl(undefined, [Validators.required]),
    presentAddress: new FormControl('', Validators.required),
    permanentAddress: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    maritalStatus: new FormControl('', Validators.required),
    phone: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    bloodGroup: new FormControl('', Validators.required),
    picture: new FormControl('', Validators.required),
    currentGradeId: new FormControl('', Validators.required),
    joinDate: new FormControl(undefined, Validators.required),
    employeeStatus: new FormControl('', Validators.required),
    departmentId: new FormControl('', Validators.required),
    currentDesignationId: new FormControl('', Validators.required),
    employeeTypeId: new FormControl('', Validators.required)
  });
  constructor(
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private notifyService: NotifyService
  ) { }
  /*
   * Properties
   *
   * */
  get f() {
    return this.employeeForm.controls;
  }
  save() {
    () => {/* */}
  }
  ngOnInit(): void {
    Object.keys(Gender).filter(
      (type) => isNaN(<any>type) && type !== 'values'
    ).forEach((v: any, i) => {
      this.genderOptions.push({ label: v, value: <any>Gender[v] });
    });
    () => {/* */ }
  }

}
