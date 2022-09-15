import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import * as moment from "moment";

export function isDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isDateValid = moment(control.value).isValid();
    return isDateValid ? {isDate: { value: control.value }} : null;
  }
}
