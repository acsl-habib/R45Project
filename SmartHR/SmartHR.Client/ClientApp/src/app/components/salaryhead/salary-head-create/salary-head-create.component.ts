import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { throwError } from 'rxjs';
import { SalaryHeadModel } from '../../../models/data/salary-head-model';
import { NotifyService } from '../../../services/common/notify.service';
import { SalaryHeadService } from '../../../services/data/salary-head.service';

@Component({
  selector: 'app-salary-head-create',
  templateUrl: './salary-head-create.component.html',
  styleUrls: ['./salary-head-create.component.css']
})
export class SalaryHeadCreateComponent implements OnInit {
  //model
  salaryHead: SalaryHeadModel | null = null;
  salaryHeadForm: FormGroup = new FormGroup({
    salaryHeadName: new FormControl('', [Validators.required, Validators.maxLength(15)]),
    description: new FormControl('', Validators.required),
    isCommon: new FormControl(false)
  });
  constructor(
    private salaryHeadService: SalaryHeadService,
    private notifyService: NotifyService
  ) { }
  get f() {
    return this.salaryHeadForm.controls;
  }
  save() {
    if (this.salaryHeadForm.invalid) return;
    this.salaryHead = {};
    Object.assign(this.salaryHead, this.salaryHeadForm.value);
    this.salaryHeadService.create(this.salaryHead)
      .subscribe(r => {
        this.notifyService.success("Salary head saved", "DISMISS");
        this.salaryHead = null;
        this.salaryHeadForm.reset({});
        this.salaryHeadForm.markAsPristine();
        this.salaryHeadForm.markAsUntouched();
      }, err => {
        this.notifyService.fail("Failed to save salary head", "DISMISS");
        throwError(err.error || err);
      })
  }
  ngOnInit(): void {
    () => {/* */}
  }

}
