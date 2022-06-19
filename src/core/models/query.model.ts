export class QueryHelper {
  public static mapToObject(result: any): any | undefined {
    if (!result && result[0]) {
      return;
    }

    return result[0];
  }

  public static mapToObjectLst(result: any): any | undefined {
    if (!result) {
      return;
    }

    return result;
  }
}
