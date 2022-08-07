export class UpdateQueryResult {
  constructor(
    public affectedRows: number,
    public insertedId: any,
    public warningStatus: number
  ) {}
}

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
