import { SalaryHeadModel } from "../salary-head-model";
import { SalaryStructureEditModel } from "./salary-structure-edit-model";

export interface GradeEditModel {
  gradeId?: number;
  gradeName?: string;
  basic?: number;
  salaryStructures?: SalaryStructureEditModel[]
}
