export class User {
  constructor(
    public id: string,
    public userName: string,
    public paraphrase: string,
    public createdAt: Date,
    public lastAccessedAt: Date
  ) {}
}
