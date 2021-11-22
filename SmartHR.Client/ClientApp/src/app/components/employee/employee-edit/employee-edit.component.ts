import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {
  picFile!: File;
  employee: EmployeeModel = {};
  editForm: FormGroup = new FormGroup({
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
    joiningDate: new FormControl(undefined, Validators.required),
    employeeStatus: new FormControl('', Validators.required),
    currentDesignationId: new FormControl('', Validators.required),
    currentGradeId: new FormControl('', Validators.required),
    sectionId: new FormControl('', Validators.required)
  })
 
  //related table
  
  grades: GradeModel[] = [];
  designations: DesignationModel[] = [];
  departments: DepartmentModel[] = []
  section: SectionModel[] = [];

  constructor(
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private gradeService: GradeService,
    private designationService: DesignationService,
    private actvatedRoute: ActivatedRoute,
    private notifyService: NotifyService,
    private datePipe: DatePipe
  ) { }

  //enum select list
  empStatus: { label: string, value: any }[] = [];
  maritalStatus: { label: string, value: any }[] = [];
  genderOptions: { label: string, value: number }[]= [];
  // property
  get f() {
    return this.editForm.controls;
  }

  //for picture change
  onChange(event: any) {
    this.picFile = event.target.files[0];
  }

  //update method
  update(): void {
    if (this.editForm.invalid) return;
    console.log(this.editForm.value);

    this.employee.employeeName = this.f.employeeName.value
    this.employee.dateOfBirth = this.f.dateOfBirth.value
    this.employee.dateOfBirth = new Date(<string>this.datePipe.transform(this.employee.dateOfBirth, "yyyy-MM-dd"));
    this.employee.presentAddress = this.f.presentAddress.value
    this.employee.permanentAddress = this.f.permanentAddress.value
    this.employee.gender = this.f.gender.value
    this.employee.maritalStatus = this.f.maritalStatus.value
    this.employee.phone = this.f.phone.value
    this.employee.email = this.f.email.value
    this.employee.bloodGroup = this.f.bloodGroup.value
    this.employee.joiningDate = this.f.joiningDate.value
    this.employee.joiningDate = new Date(<string>this.datePipe.transform(this.employee.joiningDate, "yyyy-MM-dd"));
    this.employee.employeeStatus = this.f.employeeStatus.value
    this.employee.currentDesignationId = this.f.currentDesignationId.value
    this.employee.currentGradeId = this.f.currentGradeId.value
    this.employee.sectionId = this.f.sectionId.value
    console.log(this.employee);
    this.employeeService.putEmployee(this.employee)
      .subscribe(m => {
        if (this.picFile != null && this.employee.employeeId) {
          this.upload(Number(this.employee.employeeId))
        }
        else {
          this.notifyService.success("Succeeded to modify employee data", "Close");
        }
      }, err => {
        this.notifyService.fail("Failed to save employee data", "Close");
      });
  }

  upload(id: number): void {
    let reader = new FileReader();
    reader.addEventListener("load", (event: any) => {
      this.employeeService.upload(id, this.picFile)
        .subscribe(r => {
          this.employee.picture = r.imagePath;
          this.notifyService.success("Succeeded to upload employee data", "Close");
        }, err => {
          this.notifyService.fail("Failed to upload image", "Close");
        })
    })
    reader.readAsDataURL(this.picFile);
  }


  ngOnInit(): void {

    //enum
    Object.keys(Gender).filter(
      (type) => isNaN(<any>type) && type !== 'values'
    ).forEach((v: any, i) => {
      this.genderOptions.push({ label: v, value: <any>Gender[v] });
    });

    Object.keys(EmployeeStatus).filter(
      (type) => isNaN(<any>type) && type !== 'values'
    ).forEach((v: any, i) => {
      this.empStatus.push({ label: v, value: <any>EmployeeStatus[v] });
    });

    Object.keys(MaritalStatus).filter(
      (type) => isNaN(<any>type) && type !== 'values'
    ).forEach((v: any, i) => {
      this.maritalStatus.push({ label: v, value: <any>MaritalStatus[v] });
    });

    // fetch employee data
    let id: number = this.actvatedRoute.snapshot.params.id;
    this.employeeService.getEmployeeById(id).
      subscribe(r => {
        this.employee = r;
        this.editForm.patchValue(this.employee);
        console.log(r);
      }, err => {
        this.notifyService.fail("Faild to load employee data", "Close");
      });

    
    this.departmentService.getSection()
      .subscribe(r => {
        this.section = r;
      }, err => {
        this.notifyService.fail("Failed to load section", "Close");
      });

    this.designationService.getDesignation()
      .subscribe(r => {
        this.designations = r;
      }, err => {
        this.notifyService.fail("Failed to load designation", "Close");
      });

    this.gradeService.get()
      .subscribe(r => {
        this.grades = r;
      }, err => {
        this.notifyService.fail("Failed to load grade", "Close");
      });

    
  }

}
