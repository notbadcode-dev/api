import { TinyInt } from "../enums/global.enum";

export class Link {
  constructor(
    public id: number,
    public link: string,
    public createdAt?: Date,
    public lastModifiedAt?: Date,
    public createdBy?: number
  ) {}
}

export class LinkHelper {
  static mapToObject(result: any): Link {
    return new Link(
      result.id,
      result.link,
      result?.createdAt ?? null,
      result?.lastModifiedAt ?? null,
      result?.createdBy ?? null
    );
  }
}

export class UserLinkDto {
  constructor(
    public id: number,
    public userId: number,
    public linkId: number,
    public name: string,
    public link: string,
    public color: string,
    public favorite: boolean,
    public active: boolean,
    public groupId?: number,
    public groupName?: string,
    public linkOrder?: number,
    public createdAt?: Date | null,
    public lastModifiedAt?: Date | null
  ) {}
}
export class UserLinkDtoHelper {
  static defaultObject(): UserLinkDto {
    return new UserLinkDto(
      0,
      0,
      0,
      "",
      "",
      "",
      false,
      false,
      0,
      "",
      0,
      new Date(),
      new Date()
    );
  }

  static mapToObject(result: any): UserLinkDto {
    if (result) {
      return new UserLinkDto(
        result.id,
        result.userid,
        result.linkId,
        result.name,
        result.link,
        result.color,
        Number(result.favorite) === TinyInt.highLogic ? true : false,
        Number(result.active) === TinyInt.highLogic ? true : false,
        result?.groupId ?? 0,
        result?.groupName ?? "",
        result?.linkOrder ?? 0,
        result?.createdAt ?? null,
        result?.lastModifiedAt ?? null
      );
    }

    return this.defaultObject();
  }

  static mapToObjectList(result: any[]): UserLinkDto[] {
    if (result && Array.isArray(result) && result.length > 0) {
      return result
        .map((res) => {
          return this.mapToObject(res);
        })
        .filter((res) => res.id > 0);
    }

    return [];
  }
}

export class ReorderLinkRequestDto {
  constructor(
    public groupId: number,
    public newLinkIdOnPosition: number,
    public lastLinkIdOnPosition: number
  ) {}
}

export class ReorderLinkResponseDto {
  constructor(
    public newLinkOnPosition: UserLinkDto,
    public lastLinkIdOnPosition: UserLinkDto
  ) {}
}
