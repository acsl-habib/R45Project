import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DepartmentModel } from '../../../models/data/department-model';
import { EmployeeModel } from '../../../models/data/employee-model';

@Component({
  selector: 'app-department-create',
  templateUrl: './department-create.component.html',
  styleUrls: ['./department-create.component.css']
})
export class DepartmentCreateComponent implements OnInit {
  
  constructor(
  ) { }
  save(f: NgForm) {

  }
  ngOnInit(): void {
    
  }

}
