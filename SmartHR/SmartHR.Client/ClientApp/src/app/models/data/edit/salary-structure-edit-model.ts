import { CalculationType } from "../constants/enum-data";

export interface SalaryStructureEditModel {
  salaryStructureId?: number;
  label?: string;
  headValue?: number;
  valueCalculationType?: CalculationType
}
