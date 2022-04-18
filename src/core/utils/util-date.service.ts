import dayjs from "dayjs";

export class UtilDateService {
  /**
   * @description Format date to string
   * @param  {string} format
   * @param  {Date} date? When not exist use current date
   */
  public static formatDate(format: string, date?: Date): string {
    return dayjs(date ?? new Date()).format(format);
  }
}
