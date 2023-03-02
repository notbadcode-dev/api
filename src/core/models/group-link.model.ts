import { GroupEntity } from "../../entity/group.entity";
import { GroupLinkEntity } from "../../entity/group-link.entity";
import { LinkEntity } from "../../entity/link.entity";

export class GroupLink {
  constructor(
    public id: number,
    public groupId: number,
    public linkId: number,
    public linkOrder: number
  ) {}
}

export interface IGroupLinkRepositoryWhere extends GroupLinkEntity {
  link: LinkEntity;
  group: GroupEntity;
}
