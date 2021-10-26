import { SalaryHeadModel } from "./salary-head-model";
import { SalaryStructureModel } from "./salary-structure-model";


export interface GradeModel {
  gradeId?: number;
  gradeName?: string;
  basic?: number;
  salaryStructures: SalaryStructureModel[];
}
