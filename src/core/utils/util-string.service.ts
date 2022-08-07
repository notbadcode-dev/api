import { FORMAT_DATE } from "../../constants/format-dates.constant";
import { USER } from "../../constants/user.constant";
import { UtilDateService } from "./util-date.service";

export class UtilStringService {
  /**
   * @description Format string with parameters
   * @param  {string} formatedData
   * @param  {string} parameterDataList? When not exist use current date
   */
  public static formatQuery(
    formatedData: string,
    parameterDataList: (string | number | Date)[]
  ): string {
    return parameterDataList
      .map((value) => this.convertToString(value))
      .reduce((previousValue, value, index) => {
        return (formatedData = formatedData.replace(`{${index}}`, value));
      }, "");
  }

  /**
   * @description Convert any data to string
   * @param  {number|string} data
   * @returns {string}
   */
  public static convertToString(data: number | string | Date): string {
    if (typeof data === "string") {
      return data;
    }

    if (typeof data === "number") {
      return Number(data).toString();
    }

    if (typeof data?.getMonth === "function") {
      return UtilDateService.formatDate(FORMAT_DATE.DATE_FOR_DATABASE, data);
    }

    return data + "";
  }

  /**
   * @description Find if there are between characters the same
   * @param  {string} paraphrase
   * @returns {boolean} - valid: true, invalid: false
   */
  public static betweenCharactersItsSameOnParaphrase(
    paraphrase: string
  ): boolean {
    const paraphraseIsValid: boolean =
      this.ControlParaphraseArgumentIsValid(paraphrase);

    if (!paraphraseIsValid) {
      return false;
    }

    const existNumberOnUserName: boolean =
      !this.paraphraseNotContainsNumbers(paraphrase);
    if (existNumberOnUserName) {
      const characters: string[] = paraphrase.split("");

      let repeatChar = "";
      let repeatNumber = 0;
      for (let char of characters) {
        repeatChar = char;

        if (repeatChar === char) {
          repeatNumber++;
        } else {
          repeatNumber = 0;
        }
      }

      return repeatNumber >= USER.NUMBER_CONTROL_REPEAT_SAME_CHAR_ON_USERNAME;
    }

    return false;
  }

  /**
   * @description Detect if password contains more than two numbers in row
   * @param  {string} paraphrase
   * @param  {numer} maxNumber
   * @returns {boolean} - valid: true, invalid: false
   */
  public static paraphraseNotContainsNumberOfNumberInRow(
    paraphrase: string,
    maxNumber: number
  ): boolean {
    const paraphraseIsValid: boolean =
      this.ControlParaphraseArgumentIsValid(paraphrase);

    if (!paraphraseIsValid) {
      return false;
    }

    const characters: string[] = paraphrase.split("");

    let repeatChar = "";
    let numberCounter = 0;
    for (var char of characters) {
      repeatChar = char;
      if (char.match(/[0-9]/g)) {
        numberCounter++;
      } else {
        numberCounter = 0;
      }
    }

    return numberCounter > maxNumber;
  }

  /**
   * @description Find if there are between characters the same
   * @param  {string} paraphrase
   * @param  {number} maxNumber
   * @returns {boolean} - valid: true, invalid: false
   */
  public static paraphraseNotContainsNumberOfNumber(
    paraphrase: string,
    maxNumber: number
  ): boolean {
    const paraphraseIsValid: boolean =
      this.ControlParaphraseArgumentIsValid(paraphrase);
    const maxNumberIsValid: boolean =
      this.ControlNumberArgumentIsValid(maxNumber);

    if (!paraphraseIsValid || !maxNumberIsValid) {
      return false;
    }

    const characters: string[] = paraphrase.split("");

    let numberCounter = 0;
    for (var char of characters) {
      if (char.match(/[0-9]/g)) {
        numberCounter++;
      }
    }

    return numberCounter >= maxNumber;
  }

  /**
   * @description Find if there are between characters the same
   * @param  {string} paraphrase
   * @returns {boolean} - valid: true, invalid: false
   */
  public static paraphraseNotContainsNumbers(paraphrase: string): boolean {
    const paraphraseIsValid: boolean =
      this.ControlParaphraseArgumentIsValid(paraphrase);

    if (!paraphraseIsValid) {
      return false;
    }

    const characters = paraphrase.split("");
    const nanCharacters = characters.map((char: string) => isNaN(Number(char)));

    const charactersLenght = characters.length;
    const nanCharactersIsTrueLenght = nanCharacters.filter(
      (char: boolean) => char === true
    ).length;

    return charactersLenght === nanCharactersIsTrueLenght;
  }

  /**
   * @description Detect if password not contains any lowercase character
   * @param  {string} paraphrase
   * @returns {boolean} - valid: true, invalid: false
   */
  public static paraphraseNotContainsLowerCaseChar(
    paraphrase: string
  ): boolean {
    return !/[a-z]/g.test(paraphrase);
  }

  /**
   * @description Detect if password not contains any uppercase character
   * @param  {string} paraphrase
   * @returns {boolean} - valid: true, invalid: false
   */
  public static praphraseNotContainsUpperChar(paraphrase: string): boolean {
    const paraphraseIsValid: boolean =
      this.ControlParaphraseArgumentIsValid(paraphrase);

    if (!paraphraseIsValid) {
      return false;
    }

    return !/[A-Z]/g.test(paraphrase);
  }

  /**
   * @description Detect if password not contains any special character
   * @param  {string} paraphrase
   * @returns {boolean} - valid: true, invalid: false
   */
  public static paraphraseNotContainsSpecialChars(paraphrase: string) {
    const paraphraseIsValid: boolean =
      this.ControlParaphraseArgumentIsValid(paraphrase);

    if (!paraphraseIsValid) {
      return false;
    }

    const specialChars = USER.ALLOWED_SPECIAL_CHARACTERS_ON_PASSWORD;
    return !specialChars.test(paraphrase);
  }

  private static ControlParaphraseArgumentIsValid(paraphrase: string) {
    if (
      !paraphrase ||
      typeof paraphrase !== "string" ||
      paraphrase.length === 0
    ) {
      return false;
    }
    return true;
  }

  private static ControlNumberArgumentIsValid(numberValue: number) {
    if (
      (!numberValue && typeof numberValue !== "number") ||
      numberValue === 0
    ) {
      return false;
    }
    return true;
  }
}
