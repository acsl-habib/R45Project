import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { SalaryHeadModel } from '../../../models/data/salary-head-model';
import { NotifyService } from '../../../services/common/notify.service';
import { SalaryHeadService } from '../../../services/data/salary-head.service';

@Component({
  selector: 'app-salary-head-edit',
  templateUrl: './salary-head-edit.component.html',
  styleUrls: ['./salary-head-edit.component.css']
})
export class SalaryHeadEditComponent implements OnInit {

  salaryHeads: SalaryHeadModel = {};
  updateForm: FormGroup = new FormGroup({
    salaryHeadName: new FormControl('', [Validators.required, Validators.maxLength(15)]),
    description: new FormControl('', Validators.required),
    isCommon: new FormControl('', Validators.required),
  })
  constructor(
    private salaryHeadService: SalaryHeadService,
    private activatedRoute: ActivatedRoute,
    private notify: NotifyService
  ) { }
  get f() {
    return this.updateForm.controls;
  }
  update() {
    if (this.updateForm.invalid) return;
    let data = this.updateForm.value;
    this.salaryHeads.salaryHeadName = data.salaryHeadName;
    this.salaryHeads.description = data.description;
    this.salaryHeads.isCommon = data.isCommon;
    console.log(this.salaryHeads);
    this.salaryHeadService.update(this.salaryHeads)
      .subscribe(
        r => {
          this.notify.success("Successfully updated data", "Dismiss");
          console.log('Done');
        },
        err => {
          this.notify.fail("Failed to save data", "Dismiss");
          throwError(err.error || err);
        }
      )

  }
  ngOnInit(): void {
    let id: number = this.activatedRoute.snapshot.params.id;
    this.salaryHeadService.getById(id).
      subscribe(r => {
        this.salaryHeads = r;
        this.updateForm.patchValue(this.salaryHeads);
        console.log(r);
      }, err => {
        this.notify.fail("Faild to load employee data", "Close");
      });
  }


}
