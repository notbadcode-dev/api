import {
  ERROR_MESSAGE,
  ERROR_MESSAGE_USER,
} from "../constants/error-message.constant";

import { USER } from "../constants/user.constant";
import { User } from "../core/models/user.model";
import { UtilStringService } from "../core/utils/util-string.service";
import { UserQuery } from "../queries/user.query";

export class UserService {
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

  /**
   * @description Control Username is good or not
   * @param  {string} userName
   * @returns string - Empty string if userName is good
   */
  private static controlUserNameIsGood(userName: string): string {
    const transformUserName: string = userName.trim().toLowerCase();

    if (transformUserName.trim().length === 0) {
      return ERROR_MESSAGE_USER.USERNAME_IS_EMPTY;
    }

    if (transformUserName.indexOf(USER.EMAIL_SYMBOL) === -1) {
      return ERROR_MESSAGE_USER.USERNAME_NOT_EMAIL;
    }

    if (
      UtilStringService.betweenCharactersItsSameOnParaphrase(
        transformUserName.split(USER.EMAIL_SYMBOL)[0]
      )
    ) {
      return ERROR_MESSAGE_USER.USERNAME_IS_SUSPICIOUS;
    }

    return "";
  }

  /**
   * @description Control Password is good or not
   * @param  {string} password
   * @returns string - Empty string if userName is good
   */
  private static controlPasswordIsGood(password: string): string {
    const transformPassword: string = password.trim();

    if (transformPassword.length !== USER.ALLOWED_CHARACTERS_PASSWORD) {
      return ERROR_MESSAGE_USER.PASSWORD_NOT_CORRECT_LENGHT;
    }

    if (
      UtilStringService.paraphraseNotContainsNumberOfNumber(
        transformPassword,
        USER.ALLOWED_NUMBERS_ON_PASSWORD
      )
    ) {
      return ERROR_MESSAGE_USER.PASSWORD_CONTAINS_MORE_THAN_TREE_NUMBERS;
    }

    if (
      UtilStringService.paraphraseNotContainsNumberOfNumberInRow(
        transformPassword,
        USER.ALLOWED_NUMBERS_IN_ROW_ON_PASSWORD
      )
    ) {
      return ERROR_MESSAGE_USER.PASSWORD_CONTAINS_MORE_THAN_TWO_NUMBERS_IN_ROW;
    }

    if (UtilStringService.paraphraseNotContainsNumbers(transformPassword)) {
      return ERROR_MESSAGE_USER.PASSWORD_NOT_CONSTAINS_NUMBERS;
    }

    if (
      UtilStringService.paraphraseNotContainsLowerCaseChar(transformPassword)
    ) {
      return ERROR_MESSAGE_USER.PASSWORD_NOT_CONSTAINS_LOWER_NUMBERS;
    }

    if (UtilStringService.praphraseNotContainsUpperChar(transformPassword)) {
      return ERROR_MESSAGE_USER.PASSWORD_NOT_CONSTAINS_UPPER_NUMBERS;
    }

    if (
      UtilStringService.paraphraseNotContainsSpecialChars(transformPassword)
    ) {
      return ERROR_MESSAGE_USER.PASSWORD_NOT_CONSTAINS_SPECIAL_CHARACTER;
    }

    return "";
  }
}
