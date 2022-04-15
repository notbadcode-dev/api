export class QueryHelper {
  public static mapToObject(result: any): any | undefined {
    if (!result && result[0]) {
      return;
    }

    return result[0];
  }
}
