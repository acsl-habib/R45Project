import { CalculationType } from "./constants/enum-data";

export interface SalaryStructureModel {
  salaryStructureId?: number;
  headValue?: number;
  valueCalculationType?: CalculationType;
  gradeId?: number;
  salaryHeadId?: number;
}
