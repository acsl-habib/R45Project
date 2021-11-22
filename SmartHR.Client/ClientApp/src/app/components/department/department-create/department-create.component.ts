import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { throwError } from 'rxjs';
import { DepartmentModel } from '../../../models/data/department-model';
import { EmployeeModel } from '../../../models/data/employee-model';
import { DepartmentInputModel } from '../../../models/data/inputmodel/department-input-model';
import { SectionModel } from '../../../models/data/section-model';
import { NotifyService } from '../../../services/common/notify.service';
import { DepartmentService } from '../../../services/data/department.service';

@Component({
  selector: 'app-department-create',
  templateUrl: './department-create.component.html',
  styleUrls: ['./department-create.component.css']
})
export class DepartmentCreateComponent implements OnInit {
  //model
  department: DepartmentInputModel = {};

  //field
  noSection: boolean = false;

  //form
  departmentForm: FormGroup = new FormGroup({
    departmentName: new FormControl('', Validators.required),
    noSection: new FormControl(this.noSection),
    sections: new FormArray([])
  });
  constructor(
    private departmentService: DepartmentService,
    private notifyService: NotifyService
  ) { }

  /*
   * Properties
   * =====================
   * */

  get f() {
    return this.departmentForm.controls;
  }
  get sections() {
    return this.departmentForm.get('sections') as FormArray;
   
  }
 
  /*
   * Methods
   * =====================
   * */

  addSection() {
    this.sections.push(new FormControl('', Validators.required))
  }
  addSectionDefualt() {
    this.sections.push(new FormControl({value:'NA', disabled: this.noSection }, Validators.required))
    
  }
  remove(index: number) {
    this.sections.removeAt(index);
  }

  /*
   * Handlers
   * =============
   * */

  noSectionChanged(event: any) {
    
    this.noSection = event.checked;
    
    if (this.noSection) {
      this.sections.clear();
      this.addSectionDefualt();
      this.sections.controls[0].patchValue('NA');
    }
    else {
      this.sections.clear();
      this.addSection();
    }  
  }

  // data save method
  save() {
    if (this.departmentForm.invalid) return;
    this.department.departmentName = this.departmentForm.value.departmentName;
    this.department.sections = this.departmentForm.get('sections')?.value;
    
    this.departmentService.createWithSection(this.department)
      .subscribe(r => {
        this.notifyService.success("Succede to save departmnt", "DISMISS");
        this.department.departmentId = r.departmentId;
        this.departmentForm.reset({});
        this.department = {};
        this.departmentForm.markAsPristine();
        this.departmentForm.markAsUntouched();
        this.sections.clear();
        this.addSection();
      }, err => {
        this.notifyService.fail("Failed to save departmnt", "DISMISS");
        throwError(err.error || err);
      })
  }
  /*
   * Life cycle
   * ===============
   * */
  ngOnInit(): void {
    this.addSection();
  }
}
