import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { CalculationType } from '../../../models/data/constants/enum-data';
import { GradeEditModel } from '../../../models/data/edit/grade-edit-model';
import { SalaryStructureEditModel } from '../../../models/data/edit/salary-structure-edit-model';
import { SalaryHeadModel } from '../../../models/data/salary-head-model';
import { SalaryStructureModel } from '../../../models/data/salary-structure-model';
import { NotifyService } from '../../../services/common/notify.service';
import { GradeService } from '../../../services/data/grade.service';
import { SalaryHeadService } from '../../../services/data/salary-head.service';
import { SalaryStructureService } from '../../../services/data/salary-structure.service';

@Component({
  selector: 'app-grade-edit',
  templateUrl: './grade-edit.component.html',
  styleUrls: ['./grade-edit.component.css']
})
export class GradeEditComponent implements OnInit {
  //model
  grade: GradeEditModel | undefined = undefined;
  //for autocomplete
  salaryHeads: string[] = [];
  //for select calculation type
  calculationTypeOptions: { label: string, value: number }[] = [];
  //forms
  gradeForm: FormGroup = new FormGroup({
    gradeName: new FormControl('', Validators.required),
    basic: new FormControl(undefined, Validators.required)
  });
  salaryStructureForm: FormGroup = new FormGroup({
    salaryHeads: new FormArray([])
  });
  constructor(
    private gradeService: GradeService,
    private salaryHeadService: SalaryHeadService,
    private salaryStructureService: SalaryStructureService,
    private notifyService: NotifyService,
    private activatedRoute: ActivatedRoute
  ) { }
  /*
   * Properties
   *
   * */
  get f() {
    return this.gradeForm.controls;
  }
  get heads() {
    return this.salaryStructureForm.get('salaryHeads') as FormArray;
  }
  /*
   * Methods
   *
   * */
  addHead(data?: SalaryStructureEditModel) {
    this.heads.push(new FormGroup({
      label: new FormControl(data?.label ?? '', Validators.required),
      headValue: new FormControl(data?.headValue ?? '', Validators.required),
      valueCalculationType: new FormControl(data?.valueCalculationType ?? undefined, Validators.required)
    }));
  }
  /*
   * Event handlers
   *
   * */
  deleteSalaryStucture(index: number) {
    if (this.grade?.salaryStructures?.length && index < this.grade?.salaryStructures?.length) {
      let toDel = this.grade?.salaryStructures[index];
      this.salaryStructureService.delete(Number(toDel.salaryStructureId))
        .subscribe(r => {
          //
          this.grade?.salaryStructures?.splice(index, 1);
          this.heads.removeAt(index);
        }, err => {

        });
    }
    else {
      this.heads.removeAt(index);
    }
    
  }
  updateSlaryStructure(index: number) {
    if (this.grade?.salaryStructures?.length && index < this.grade?.salaryStructures?.length) {
      let l = this.heads.controls[index].get('label')?.value;
      let v = this.heads.controls[index].get('headValue')?.value;
      let c = this.heads.controls[index].get('valueCalculationType')?.value;
      let existing = this.grade?.salaryStructures[index];
    
      let data: SalaryStructureEditModel = {
        salaryStructureId: existing?.salaryStructureId,
        label: l,
        headValue: v,
        valueCalculationType: c
      };
      console.log(data);
      this.salaryStructureService.updateOrCreate(Number(this.grade?.gradeId), data)
        .subscribe(r => {
          this.notifyService.success("Salary sturcture updated", "DISMISS");
          existing.label = r.label;
          existing.headValue = r.headValue;
          existing.valueCalculationType = r.valueCalculationType;
        }, err => {
          this.notifyService.fail("Failed to save", "DISMISS");
          throwError(err.error || err);
        });
    }
    else {
      let l = this.heads.controls[index].get('label')?.value;
      let v = this.heads.controls[index].get('headValue')?.value;
      let c = this.heads.controls[index].get('valueCalculationType')?.value;
     
      
      let data: SalaryStructureEditModel = {
        
        label: l,
        headValue: v,
        valueCalculationType: c
      };
      console.log(data);
      this.salaryStructureService.updateOrCreate(Number(this.grade?.gradeId), data)
        .subscribe(r => {
          this.notifyService.success("Salary sturcture updated", "DISMISS");
          let newSalarStructrue: SalaryStructureEditModel = {
            salaryStructureId:r.salaryStructureId,
            label:r.label,
            headValue:r.headValue,
            valueCalculationType:r.valueCalculationType
        };
          this.grade?.salaryStructures?.push(newSalarStructrue);
        }, err => {
          this.notifyService.fail("Failed to save", "DISMISS");
          throwError(err.error || err);
        });
    }
  }
  ngOnInit(): void {
    let id: number = this.activatedRoute.snapshot.params.id;
    Object.keys(CalculationType).filter(
      (type) => isNaN(<any>type) && type !== 'values'
    ).forEach((v: any, i) => {
      this.calculationTypeOptions.push({ label: v, value: <any>CalculationType[v] });
    });
    this.salaryHeadService.getLabels()
      .subscribe(r => {
        this.salaryHeads = r;
        console.log(this.salaryHeads);
      }, err => {
        this.notifyService.fail("Failed to load salary heads", "DISMISS");
        throwError(err.error || err);
      });
    this.gradeService.getByIdForEdit(id)
      .subscribe(x => {
        this.grade = x;
        //this.f.gradeName.patchValue(this.grade.gradeName);
        //this.f.basic.patchValue(this.grade.basic);
        this.gradeForm.patchValue({ gradeName: this.grade.gradeName, basic: this.grade.basic });
        this.grade.salaryStructures?.forEach(v => {
          this.addHead(v);
        });

      }, err => {
        this.notifyService.fail("Failed to load grade", "DISMISS");
        throwError(err.error || err);
      });
    this.salaryHeadService.getLabels()
      .subscribe(r => {
        this.salaryHeads = r;
        //console.log(this.salaryHeads);
      }, err => {
        this.notifyService.fail("Failed to load salary heads", "DISMISS");
        throwError(err.error || err);
      });
  }

}
