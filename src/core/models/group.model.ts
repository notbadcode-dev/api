export class Group {
  constructor(
    public id: number,
    public groupOrder: number,
    public name: string,
    public description: string,
    public linksCount: number,
    public createdAt?: Date,
    public lastModifiedAt?: Date
  ) {}
}
