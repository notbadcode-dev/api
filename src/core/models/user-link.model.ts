export class UserLink {
  constructor(
    public id: number,
    public name: string,
    public color: string,
    public userId: number,
    public linkId: number,
    public favorite: boolean,
    public active: boolean,
    public createdAt: Date,
    public lastModifiedAt: Date
  ) {}
}
