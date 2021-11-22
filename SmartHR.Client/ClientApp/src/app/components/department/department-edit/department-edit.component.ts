import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { DepartmentModel } from '../../../models/data/department-model';
import { DepartmentInputModel } from '../../../models/data/inputmodel/department-input-model';
import { NotifyService } from '../../../services/common/notify.service';
import { DepartmentService } from '../../../services/data/department.service';

@Component({
  selector: 'app-department-edit',
  templateUrl: './department-edit.component.html',
  styleUrls: ['./department-edit.component.css']
})
export class DepartmentEditComponent implements OnInit {
  //model
  department: DepartmentModel = {};
  //Fields
  noSection = false;
  //form

  departmentForm: FormGroup = new FormGroup({
    departmentName: new FormControl('', Validators.required),
    noSection: new FormControl(this.noSection),
    sections: new FormArray([])
  });
  constructor(
    private departmentService: DepartmentService,
    private notifyService: NotifyService,
    private activatedRoute: ActivatedRoute
  ) { }
  /*
   * Properties
   *
   * */
  get f() {
    return this.departmentForm.controls;
  }
  get sections() {
    return this.departmentForm.controls.sections as FormArray;
  }
  get hasSection() {
    return this.noSection;
  }
  /*
   * Methods
   *
   * */
  addSection(sectionName?: string): void {
    this.sections.push(new FormControl({ value: sectionName ?? '', disabled: this.hasSection }, Validators.required));
  }
  removeSection(index: number) {
    this.sections.removeAt(index);
  }
  setFormValues() {
    console.log('form values')
    this.f.departmentName.patchValue(this.department.departmentName);
    console.log(this.departmentForm.controls.departmentName.value);
    this.noSection = true;
    if (this.department?.sections) {
      if (this.department.sections?.length > 0) {
        this.noSection = false;
      }
      if (this.department.sections.length == 1 && this.department.sections[0].sectionName == 'NA') {
        this.noSection = true;
      }
      this.departmentForm.controls.noSection.patchValue(this.noSection);
    }
    this.department.sections?.forEach(s => {
      this.addSection(s.sectionName);
    });
  }
  /*
   * Event handlers
   *
   * */
  update() {
    console.log(this.departmentForm.value);
    let data: DepartmentInputModel = {
      departmentId: this.department.departmentId,
      departmentName: this.departmentForm.value.departmentName,
      sections: this.sections.value
    };

    this.departmentService.updateWithSections(data)
      .subscribe(r => {
        this.notifyService.success("Succeeded to update department", "DISMISS");
      }, err => {
        this.notifyService.fail("Failed to update department", "DISMISS");
        throwError(err.error || err);
      })
  }
  noSectionChanged(event:any) {
    this.noSection = event.checked;
    if (this.noSection) {

      this.sections.controls[0].patchValue('NA');
      this.sections.controls[0].disable();
      if (this.sections.controls.length > 1) {
        for (var i = 1; i < this.sections.controls.length; i++) {
          this.sections.removeAt(i);
        }
      }
    }
    else {
      this.sections.controls[0].patchValue('');
      this.sections.controls[0].enable();
    }
    
  }
  resetForm() {
    console.log('reset');
    this.departmentForm.markAsUntouched();
    this.departmentForm.markAsPristine();
    this.departmentForm.reset({});
    this.sections.clear();
    this.setFormValues();
  }
  /*
   * Component life cycle event
   *
   * */
  
  ngOnInit(): void {
    let id: number = this.activatedRoute.snapshot.params.id;
    this.departmentService.getByIdWithSections(id)
      .subscribe(r => {
        this.department = r;
        this.setFormValues();
      }, err => {
        this.notifyService.fail("Failed to load department", "DISMISS");
        throwError(err.error || err);
      });
  }

}
