import { ERROR_MESSAGE_USER } from "../../../constants/error-message.constant";
import { USER } from "../../../constants/user.constant";
import { User } from "../../models/user.model";
import { UtilStringService } from "../../utils/util-string.service";

export class UserAuxiliarService {
  /**
   * @description Verify arguments for update function
   * @param  {User} updateUser
   * @returns {boolean} - true: valid, false: invalid
   */
  protected verifyArgumentsForUpdate(updateUser: User): boolean {
    if (!updateUser) {
      return false;
    }

    if (
      !updateUser.id ||
      typeof updateUser.id !== "number" ||
      updateUser.id <= 0
    ) {
      return false;
    }

    if (
      !updateUser.userName ||
      typeof updateUser.userName !== "string" ||
      updateUser.userName.trim().length === 0
    ) {
      return false;
    }

    if (
      !updateUser.paraphrase ||
      typeof updateUser.paraphrase !== "string" ||
      updateUser.paraphrase.trim().length === 0
    ) {
      return false;
    }

    return true;
  }

  /**
   * @description Control Username is good or not
   * @param  {string} userName
   * @returns string - Empty string if userName is good
   */
  protected static controlUserNameIsGood(userName: string): string {
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
  protected static controlPasswordIsGood(password: string): string {
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
