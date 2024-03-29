import { JsonWebTokenError } from "jsonwebtoken";

import { UserEntity } from "../../entity/user.entity";

export class User {
  constructor(
    public id: number,
    public userName: string,
    public paraphrase?: string,
    public createdAt?: Date,
    public lastAccessedAt?: Date
  ) {}
}

export class UserHelper {
  public static defaultObject(): User {
    return new User(0, "");
  }

  public static mapToObject(user: UserEntity): User {
    if (user) {
      return new User(
        user.id,
        user.userName,
        user.paraphrase,
        user.createdAt,
        user.lastAccessedAt
      );
    }

    return this.defaultObject();
  }
}

export class VerifyUserToken {
  constructor(
    public valid: boolean,
    public user?: User,
    public token?: string,
    public verifyError?: JsonWebTokenError
  ) {}
}

export class VerifyUserTokenHelper {
  public static defaultObject(): VerifyUserToken {
    return new VerifyUserToken(false);
  }
}
