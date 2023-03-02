export class AuthAuxiliarService {
  /**
   * @description Verify arguments for signIn function
   * @param  {string} userName
   * @param  {string} paraphrase
   * @returns {boolean} - true: valid, false: invalid
   */
  verifyArgumentsForSignIn(userName: string, paraphrase: string): boolean {
    if (!userName || typeof userName !== "string" || userName.length === 0) {
      return false;
    }

    if (
      !paraphrase ||
      typeof paraphrase !== "string" ||
      paraphrase.length === 0
    ) {
      return false;
    }

    return true;
  }

  /**
   * @description Verify arguments for keepSession function
   * @param  {number} userId
   * @param  {string} token
   * @returns {boolean} - true: valid, false: invalid
   */
  verifyArgumentsForKeepSession(userId: number, token: string): boolean {
    if (!userId || typeof userId !== "number" || userId <= 0) {
      return false;
    }

    if (!token || typeof token !== "string" || token.length === 0) {
      return false;
    }

    return true;
  }
}
