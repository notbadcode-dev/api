import * as mariadb from "mariadb";

export const connection = mariadb.createPool({
  host: "localhost",
  user: "notbadcode",
  password: "6900",
  database: "links",
  connectionLimit: 5,
  checkDuplicate: true,
});
