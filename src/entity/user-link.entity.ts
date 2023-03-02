import {
  IsDate,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsRgbColor,
  IsString,
  MaxLength,
} from "class-validator";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { LinkEntity } from "./link.entity";
import { UserEntity } from "./user.entity";

@Entity({
  name: "userslinks",
})
export class UserLinkEntity {
  @PrimaryGeneratedColumn("increment", {
    name: "id",
  })
  @IsInt()
  id!: number;

  @Column({
    name: "name",
    nullable: false,
  })
  @IsString()
  @MaxLength(250)
  @IsNotEmpty()
  name!: string;

  @Column({
    name: "color",
    nullable: false,
  })
  @IsString()
  @MaxLength(9)
  @IsNotEmpty()
  @IsRgbColor(false)
  color!: string;

  @OneToOne((type) => UserEntity)
  @JoinColumn({ name: "userId" })
  user!: UserEntity;

  @OneToOne((type) => LinkEntity)
  @JoinColumn({ name: "linkId" })
  link!: LinkEntity;

  @Column({
    name: "favorite",
    type: "tinyint",
  })
  @IsInt()
  @IsNotEmpty()
  favorite!: number;

  @Column({
    name: "active",
    type: "tinyint",
  })
  @IsInt()
  @IsNotEmpty()
  active!: number;

  @Column({
    name: "createdAt",
    type: "datetime",
    nullable: false,
    select: false,
  })
  @IsDate()
  @IsDateString()
  @CreateDateColumn()
  createdAt!: Date;

  @Column({
    name: "lastModifiedAt",
    type: "datetime",
    nullable: true,
    select: false,
  })
  @IsDate()
  @IsDateString()
  lastModifiedAt!: Date;
}
