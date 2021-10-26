import { Component, OnInit } from '@angular/core';
import { CalculationType } from '../../../models/data/constants/enum-data';

@Component({
  selector: 'app-grade-create',
  templateUrl: './grade-create.component.html',
  styleUrls: ['./grade-create.component.css']
})
export class GradeCreateComponent implements OnInit {
  calculationTypeOptions: { label: string, value: number }[] = [];
  x: number[] = [];
  constructor() { }

  ngOnInit(): void {
    
    Object.keys(CalculationType).filter(
      (type) => isNaN(<any>type) && type !== 'values'
    ).forEach((v: any, i) => {
      this.calculationTypeOptions.push({ label: v, value: <any>CalculationType[v] });
    });
    console.log(this.calculationTypeOptions);
  }

}
