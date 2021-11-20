import { ErrorHandler } from "@angular/core";

export class GlobalErrorHandler implements  ErrorHandler {
  handleError(err: any): void {
    console.log(err.error || err);
   }
}
