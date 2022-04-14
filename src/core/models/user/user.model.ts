export interface User {
  id: string;
  userName: string;
  paraphrase: string;
  createdAt: Date;
  lastAccessedAt: Date;
}

export class UserHelper {
  public static mapToObject(result: any): User | undefined {
    if (!result && result[0]) {
      return;
    }

    return result[0];
  }
}
