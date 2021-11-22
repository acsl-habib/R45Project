import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { DesignationModel } from '../../../models/data/designation-model';
import { NotifyService } from '../../../services/common/notify.service';
import { DesignationService } from '../../../services/data/designation.service';

@Component({
  selector: 'app-designation-edit',
  templateUrl: './designation-edit.component.html',
  styleUrls: ['./designation-edit.component.css']
})
export class DesignationEditComponent implements OnInit {


  designations: DesignationModel = {};
  updateForm: FormGroup = new FormGroup({
    designationName: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  })
  constructor(
    private designationService: DesignationService,
    private notifyService: NotifyService,
    private activatedRoute: ActivatedRoute
  ) { }
  get f() {
    return this.updateForm.controls;
  }
  update() {
    if (this.updateForm.invalid) return;
    let data = this.updateForm.value;
    this.designations.designationName = data.designationName;
    this.designations.description = data.description;
    
    console.log(this.designations);
    this.designationService.updateDesignation(this.designations)
      .subscribe(
        r => {
          this.notifyService.success("Successfully updated data", "Dismiss");
          console.log('Done');
        },
        err => {
          this.notifyService.fail("Failed to save data", "Dismiss");
          throwError(err.error || err);
        }
      )

  }
  ngOnInit(): void {
    let id: number = this.activatedRoute.snapshot.params.id;
    this.designationService.getDesignationById(id).
      subscribe(r => {
        this.designations = r;
        this.updateForm.patchValue(this.designations);
        console.log(r);
      }, err => {
        this.notifyService.fail("Faild to load designation data", "Close");
      });
  }
}
