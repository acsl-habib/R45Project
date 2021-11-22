import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeStatus, Gender, MaritalStatus } from '../../../models/data/constants/enum-data';
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
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit {
  employee: EmployeeModel = {};
  employeeForm: FormGroup = new FormGroup({
    employeeName: new FormControl('', [Validators.required, Validators.maxLength(40)]),
    dateOfBirth: new FormControl(undefined, [Validators.required]),
    bloodGroup: new FormControl('', Validators.required),
    presentAddress: new FormControl('', Validators.required),
    permanentAddress: new FormControl('', Validators.required),
    maritalStatus: new FormControl('', Validators.required),
    picture: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    phone: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    currentGradeId: new FormControl('', Validators.required),
    joiningDate: new FormControl(undefined, Validators.required),
    employeeStatus: new FormControl('', Validators.required),
    departmentId: new FormControl('', Validators.required),
    currentDesignationId: new FormControl('', Validators.required),
    sectionId: new FormControl('', Validators.required)
  });

  //picture
  picFile!: File;

  // for select list
  
  grade: GradeModel[] = [];
  designation: DesignationModel[] = [];
  department: DepartmentModel[] = [];
  section: SectionModel[] = [];

  //enum
  empStatus: { label: string, value: any }[] = [];
  maritalStatus: { label: string, value: any }[] = [];
  genderOptions: { label: string, value: number }[] = [];
  constructor(
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private gradeService: GradeService,
    private designationService: DesignationService,
    private notifyService: NotifyService,
    private datePipe: DatePipe
  ) {}
  /*
   * Properties
   *
   * */
  get f() {
    return this.employeeForm.controls;
  }

  // save method
  save():void {
    if (this.employeeForm.invalid) return;
    console.log(this.employeeForm);
    Object.assign(this.employee, this.employeeForm.value);
    this.employee.picture = 'no-pic.jpg';
    this.employee.employeeName = this.f.employeeName.value
    this.employee.dateOfBirth = this.f.dateOfBirth.value
    this.employee.dateOfBirth = new Date(<string>this.datePipe.transform(this.employee.dateOfBirth, "yyyy-MM-dd"));
    this.employee.presentAddress = this.f.presentAddress.value
    this.employee.permanentAddress = this.f.permanentAddress.value
    this.employee.bloodGroup = this.f.bloodGroup.value
    this.employee.maritalStatus = this.f.maritalStatus.value
    this.employee.gender = this.f.gender.value
    this.employee.phone = this.f.phone.value
    this.employee.email = this.f.email.value
    this.employee.currentGradeId = this.f.currentGradeId.value
    this.employee.joiningDate = this.f.joiningDate.value
    this.employee.joiningDate = new Date(<string>this.datePipe.transform(this.employee.joiningDate, "yyyy-MM-dd"));
    this.employee.employeeStatus = this.f.employeeStatus.value
    this.employee.departmentId = this.f.departmentId.value
    this.employee.currentDesignationId = this.f.currentDesignationId.value
    this.employee.sectionId = this.f.sectionId.value
    this.employeeService.postEmployee(this.employee)
      .subscribe(r => {
        this.upload(Number(r.employeeId));
      }, err => {
        this.notifyService.fail("failed to data insert", "DISMISS");
      })
    console.log(this.employeeForm.value);
  }
  // upload picture
  upload(id: number) {
    let reader = new FileReader();
    reader.addEventListener("load", (event: any) => {
      this.employeeService.upload(id, this.picFile)
        .subscribe(r => {
          this.employee.picture = r.imagePath;
          this.notifyService.success("Succeeded to save mobile data", "Close");
          this.employeeForm.reset({});
          this.employeeForm.markAsPristine();
          this.employeeForm.markAsUntouched();
        }, err => {
          this.notifyService.fail("Failed to upload picture", "Close");
        })
    })
    reader.readAsDataURL(this.picFile);
  }
  onChange(event: any) {
    this.picFile = event.target.files[0];
  }

 // get enum value
  ngOnInit(): void {
    Object.keys(Gender).filter(
      (type) => isNaN(<any>type) && type !== 'values'
    ).forEach((v: any, i) => {
      this.genderOptions.push({label: v, value:<any> Gender[v]});
    });
    Object.keys(EmployeeStatus).filter(
      (type) => isNaN(<any>type) && type !== 'values'
    ).forEach((v: any, i) => {
      this.empStatus.push({ label: v, value: <any>EmployeeStatus[v] });
    });
    Object.keys(MaritalStatus).filter(
      (type) => isNaN(<any>type) && type !== 'values'
    ).forEach((v: any, i) => {
      this.maritalStatus.push({ label: v, value:<any> MaritalStatus[v] });
    });

    //get related data in select list
    this.departmentService.getDepartment()
      .subscribe(r => {
        this.department = r;
      }, err => {
        this.notifyService.fail("can't fatch department data", "DISMISS");
      });

    this.gradeService.get()
      .subscribe(r => {
        this.grade = r;
      }, err => {
        this.notifyService.fail("can't fatch grade data", "DISMISS");
      });

    this.departmentService.getSection()
      .subscribe(r => {
        this.section = r;
      }, err => {
        this.notifyService.fail("can't fatch section data", "DISMISS");
      });

    this.designationService.getDesignation()
      .subscribe(r => {
        this.designation = r;
      }, err => {
        this.notifyService.fail("can't fatch designation data", "DISMISS");
      });

   
  }

}
