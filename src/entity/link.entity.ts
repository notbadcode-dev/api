import {
  IsDate,
  IsDateString,
  IsInt,
  IsNotEmpty,
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

import { UserEntity } from "./user.entity";

@Entity({
  name: "links",
})
export class LinkEntity {
  @PrimaryGeneratedColumn("increment", {
    name: "id",
  })
  @IsInt()
  id!: number;

  @Column({
    name: "link",
    nullable: false,
  })
  @IsString()
  @MaxLength(250)
  @IsNotEmpty()
  link!: string;

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

  @OneToOne((type) => UserEntity)
  @JoinColumn({ name: "createdBy" })
  user!: UserEntity;
}
