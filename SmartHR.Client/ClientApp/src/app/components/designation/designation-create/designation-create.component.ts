import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { throwError } from 'rxjs';
import { DesignationModel } from '../../../models/data/designation-model';
import { NotifyService } from '../../../services/common/notify.service';
import { DesignationService } from '../../../services/data/designation.service';

@Component({
  selector: 'app-designation-create',
  templateUrl: './designation-create.component.html',
  styleUrls: ['./designation-create.component.css']
})
export class DesignationCreateComponent implements OnInit {

  //model
  designations: DesignationModel = {};
  //form
  designationForm: FormGroup = new FormGroup({
    designationName: new FormControl('', Validators.required),
    description: new FormControl('',Validators.required)
  })
  constructor(
    private designationService: DesignationService,
    private notifyService: NotifyService
  ) { }
  get f() {
    return this.designationForm.controls;
  }
  save() {
    if (this.designationForm.invalid) return;
    console.log(this.designationForm.value);
    Object.assign(this.designations, this.designationForm.value);
    this.designationService.createDesignation(this.designations)
      .subscribe(r => {
        this.notifyService.success("Designaition saved", "DISMISS");
        this.designationForm.reset({});
        this.designationForm.markAsPristine();
        this.designationForm.markAsUntouched();
      }, err => {
        this.notifyService.fail("Failed to save designation", "DISMISS");
        throwError(err.error || err);
      });
  }
  ngOnInit(): void {
    () => {/* */ }
  }

}
