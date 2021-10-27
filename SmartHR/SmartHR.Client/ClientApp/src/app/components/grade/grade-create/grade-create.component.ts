import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { throwError } from 'rxjs';
import { CalculationType } from '../../../models/data/constants/enum-data';
import { GradeModel } from '../../../models/data/grade-model';
import { SalaryStructureInputModel } from '../../../models/inputmodel/salary-structure-input-model';
import { NotifyService } from '../../../services/common/notify.service';
import { GradeService } from '../../../services/data/grade.service';
import { SalaryHeadService } from '../../../services/data/salary-head.service';

@Component({
  selector: 'app-grade-create',
  templateUrl: './grade-create.component.html',
  styleUrls: ['./grade-create.component.css']
})
export class GradeCreateComponent implements OnInit {
  //tab select
  currentTabIndex = 0;
  //model
  grade: GradeModel | undefined;
  //form
  gradeForm: FormGroup = new FormGroup({
    gradeName: new FormControl('', Validators.required),
    basic: new FormControl(undefined, Validators.required)
  });
  salaryStructureForm: FormGroup = new FormGroup({
    salaryHeads: new FormArray([])
  });
  //select options
  calculationTypeOptions: { label: string, value: number }[] = [];
  //for salary head auto complete
  salaryHeads: string[] = [];
 
  constructor (
    private gradeService: GradeService,
    private salaryHeadService: SalaryHeadService,
    private notifyService: NotifyService
  ) { }
  //properties
  get f() {
    return this.gradeForm.controls;
  }
  get isGradeCreated(): boolean {
    return this.grade != null;
  }
  get heads() {
    return this.salaryStructureForm.get('salaryHeads') as FormArray;
  }
  
  //Methods
  addHead() {
    this.heads.push(new FormGroup({
      label: new FormControl('', Validators.required),
      headValue: new FormControl('', Validators.required),
      valueCalculationType: new FormControl('', Validators.required)
    }));
  }
  //handlers
  saveGrade() {
    if (this.gradeForm.invalid) return;
    let data = {};
    Object.assign(data, this.gradeForm.value);
    this.grade = data as GradeModel;
    this.gradeService.create(this.grade)
      .subscribe(r => {
        this.notifyService.success("Grade saveed", "DISMISS");
        this.grade = r;
        //this.gradeForm.reset({});
        this.gradeForm.markAsPristine();
        this.gradeForm.markAsUntouched();
        this.currentTabIndex = this.currentTabIndex + 1;
      }, err => {
        this.notifyService.fail("Failed to save salary grade", "DISMISS");
        throwError(err.error || err);
      });
  }
  saveSlaryStructure() {
    if (this.salaryStructureForm.invalid) return;
    let data: SalaryStructureInputModel[]=
      this.salaryStructureForm.value.salaryHeads as SalaryStructureInputModel[];
    //console.log(data);
    this.gradeService.saveSalaryStructure(<number>this.grade?.gradeId, data)
      .subscribe(r => {
        this.notifyService.success("Salary structures saved", "DISMISS");
        this.salaryStructureForm.markAsPristine();
        this.salaryStructureForm.markAsUntouched();
      }, err => {
        this.notifyService.fail("Failed to save salary structure", "DISMISS");
        throwError(err.error || err);
      })
  }
  deleteTab(i: number) {
    this.heads.removeAt(i);
  }
  ngOnInit(): void {
    this.salaryHeadService.getLabels()
      .subscribe(r => {
        this.salaryHeads = r;
        console.log(this.salaryHeads);
      }, err => {
        this.notifyService.fail("Failed to load salary heads", "DISMISS");
        throwError(err.error || err);
      })
    Object.keys(CalculationType).filter(
      (type) => isNaN(<any>type) && type !== 'values'
    ).forEach((v: any, i) => {
      this.calculationTypeOptions.push({ label: v, value: <any>CalculationType[v] });
    });
    this.addHead();
    
   
  }

}
