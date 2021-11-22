import { CalculationType } from "../constants/enum-data";

export interface SalaryStructureInputModel {
  label?: string;
  headValue?: number;
  valueCalculationType?: CalculationType
}
