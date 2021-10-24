import { WeekDay } from "@angular/common";

export class BusinessDay {
  constructor(
    public businessDayId?: number,
    public weekday?: WeekDay,
    public isOn?: boolean
  ) { }
}
