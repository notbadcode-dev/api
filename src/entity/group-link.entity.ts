import { IsInt, IsNotEmpty } from "class-validator";
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { GroupEntity } from "./group.entity";
import { LinkEntity } from "./link.entity";

@Entity({
  name: "groupsLinks",
})
export class GroupLinkEntity {
  @PrimaryGeneratedColumn("increment", {
    name: "id",
  })
  @IsInt()
  id!: number;

  @OneToOne((type) => GroupEntity)
  @JoinColumn({ name: "groupId" })
  group!: GroupEntity;

  @OneToOne((type) => LinkEntity)
  @JoinColumn({ name: "linkId" })
  link!: LinkEntity;

  @Column({
    name: "linkOrder",
    nullable: false,
  })
  @IsInt()
  @IsNotEmpty()
  linkOrder!: number;
}
