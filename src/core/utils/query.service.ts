export class QueryService {
  /**
   * @description Execure function also undefined value
   * @param  {any} undefinedControlValue possibly undefined value
   * @param  {Function} failedFunction Execute function when undefined value
   * @param  {Function} successFunction Execute function when not undefined value
   */
  public static controlUndefinedResult(
    undefinedControlValue: any,
    failedFunction: Function,
    succesFunction: Function
  ): void {
    if (undefinedControlValue === undefined && failedFunction) {
      failedFunction();
    }

    if (undefinedControlValue !== undefined && succesFunction) {
      succesFunction();
    }

    return;
  }
}
