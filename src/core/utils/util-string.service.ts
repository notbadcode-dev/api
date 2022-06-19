import { FORMAT_DATE } from "../../constants/format-dates.constant";
import { UtilDateService } from "./util-date.service";

export class UtilQueryService {
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
   * @returns string
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
}
