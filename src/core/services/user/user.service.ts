import {
  ERROR_MESSAGE,
  ERROR_MESSAGE_USER,
} from "../../../constants/error-message.constant";

import { User } from "../../models/user.model";
import { UserQuery } from "../../../queries/user.query";
import { UserAuxiliarService } from "./user-auxiliar.service";

export class UserService extends UserAuxiliarService {
  /**
   * @description Create user
   * @param  {User} newUser
   * @param  {CallableFunction} callback - success: Created user, error: error message
   * @returns {any} - Callback function for get response with created user or error message
   */
  public static async create(
    newUser: User,
    callback: CallableFunction
  ): Promise<void> {
    const foundUser: User | void = await UserQuery.getUserByUserNameQuery(
      newUser.userName,
      callback
    );

    if (
      foundUser &&
      foundUser.userName.trim().toLowerCase() ===
        newUser.userName.trim().toLowerCase()
    ) {
      return callback(ERROR_MESSAGE_USER.USER_ALREADE_EXIST_SAME_USERNAME);
    }

    const userQueryResult: User | void = await UserQuery.createUserQuery(
      newUser,
      callback
    );

    if (!userQueryResult) {
      return callback(ERROR_MESSAGE.FAILED_CREATE_ANY("user"));
    }

    return callback(null, userQueryResult);
  }

  /**
   * @description Update user
   * @param  {User} updateUser
   * @param  {CallableFunction} callback - success: Updated user, error: error message
   * @returns {any} - Callback function for get response with updated user or error message
   */
  public static async update(
    updateUser: User,
    callback: CallableFunction
  ): Promise<void> {
    const foundUser: User | void = await UserQuery.getUserByIdQuery(
      updateUser.id,
      callback
    );

    if (
      !foundUser ||
      !foundUser?.id ||
      foundUser.userName.trim().toLowerCase() !==
        updateUser.userName.trim().toLowerCase()
    ) {
      return callback(ERROR_MESSAGE.FAILED_GET_ANY("user"));
    }

    const userNameIncorrect: string = this.controlUserNameIsGood(
      updateUser.userName
    );

    const passwordIncorrect: string = this.controlPasswordIsGood(
      updateUser.paraphrase ?? ""
    );

    if (userNameIncorrect.length > 0) {
      return callback(userNameIncorrect);
    }

    if (passwordIncorrect.length > 0) {
      return callback(passwordIncorrect);
    }

    let userQueryResult: number | void = await UserQuery.UpdateUserQuery(
      updateUser,
      callback
    );

    if (!userQueryResult) {
      return callback(ERROR_MESSAGE.FAILED_UPDATE_ANY("user"));
    }

    foundUser.userName = updateUser.userName;
    foundUser.paraphrase = updateUser.paraphrase;
    return callback(null, foundUser);
  }
}