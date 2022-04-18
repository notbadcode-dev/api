export class SQLExecuteResult {
  constructor(
    public affectedRows: number,
    public insertId: number,
    public warningStatus: number
  ) {}
}
