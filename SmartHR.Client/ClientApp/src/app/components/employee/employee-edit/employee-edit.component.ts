import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Gender } from '../../../models/data/constants/enum-data';
import { EmployeeModel } from '../../../models/data/employee-model';
import { NotifyService } from '../../../services/common/notify.service';
import { EmployeeService } from '../../../services/data/employee.service';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {
  genderOptions: { label: string, value: number }[] = [];
  //Model
  emplyee: EmployeeModel = {};
  //Form
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
    private notifyService: NotifyService,
    private activatedRoute: ActivatedRoute
  ) { }
  get f() {
    return this.employeeForm.controls;
  }
  ngOnInit(): void {
    Object.keys(Gender).filter(
      (type) => isNaN(<any>type) && type !== 'values'
    ).forEach((v: any, i) => {
      this.genderOptions.push({ label: v, value: <any>Gender[v] });
    });
    let id: number = 1; //from route
    this.employeeService.getById(id)
      .subscribe(r => {
        this.emplyee = r;
        this.employeeForm.patchValue(this.emplyee);
        console.log(this.employeeForm.value);
      }, err => {

      });
  }

}
