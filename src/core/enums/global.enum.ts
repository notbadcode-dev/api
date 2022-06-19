export enum TinyInt {
  notExists = -1,
  downLogic = 0,
  highLogic = 1,
}

export type TinyIntTypes =
  | TinyInt.notExists
  | TinyInt.downLogic
  | TinyInt.highLogic;
