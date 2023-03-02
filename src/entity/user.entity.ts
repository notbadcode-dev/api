import {
  IsDate,
  IsDateString,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
} from "class-validator";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({
  name: "users",
})
export class UserEntity {
  @PrimaryGeneratedColumn("increment", {
    name: "id",
  })
  @IsInt()
  id!: number;

  @Column({
    name: "userName",
    nullable: false,
  })
  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  @IsEmail()
  userName!: string;

  @Column({
    name: "paraphrase",
    nullable: false,
    type: "varchar",
    length: 250,
  })
  @IsString()
  @MaxLength(250)
  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 8,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minLowercase: 1,
  })
  paraphrase!: string;

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
    name: "lastAccessedAt",
    type: "datetime",
    nullable: true,
    select: false,
  })
  @IsDate()
  @IsDateString()
  lastAccessedAt!: Date;

  @Column({
    name: "updatedAt",
    type: "datetime",
    nullable: true,
    select: false,
  })
  @IsDate()
  @IsDateString()
  @UpdateDateColumn()
  updatedAt!: Date;

  @Column({
    name: "deletedAt",
    type: "datetime",
    nullable: true,
    select: false,
    default: null,
  })
  @IsDate()
  @IsDateString()
  deletedAt!: Date;
}
