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
  name: "groups",
})
export class GroupEntity {
  @PrimaryGeneratedColumn("increment", {
    name: "id",
  })
  @IsInt()
  id!: number;

  @OneToOne((type) => UserEntity)
  @JoinColumn({ name: "userId" })
  user!: UserEntity;

  @Column({
    name: "groupOrder",
    nullable: true,
  })
  @IsInt()
  groupOrder!: number;

  @Column({
    name: "name",
    nullable: false,
    length: 50,
  })
  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  name!: string;

  @Column({
    name: "name",
    nullable: false,
    length: 250,
  })
  @IsString()
  @MaxLength(250)
  @IsNotEmpty()
  description!: string;

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
