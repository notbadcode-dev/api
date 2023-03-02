import { DataSource } from "typeorm";

export const connectionAuth = {
  type: "mariadb",
  host: "localhost",
  port: 3306,
  user: "notbadcode",
  password: "6900",
  database: "auth",
  connectionLimit: 5,
  checkDuplicate: true,
  entities: ["src/entity/*.ts"],
  logging: true,
  dateStrings: true,
};

export const AuthDataSource = new DataSource({
  type: "mariadb",
  host: "localhost",
  port: 3306,
  username: "notbadcode",
  password: "6900",
  database: "auth",
  entities: ["src/entity/*.ts"],
  logging: true,
  dateStrings: true,
  trace: true,
  connectorPackage: "mysql",
  logger: "debug",
  maxQueryExecutionTime: 5,
  cache: {
    type: "database",
    duration: 600000, // 10 minutes
    ignoreErrors: true,
  },
});

export const connectionLinks = {
  host: "localhost",
  user: "notbadcode",
  password: "6900",
  database: "links",
  connectionLimit: 5,
  checkDuplicate: true,
  entities: ["src/entity/*.js"],
  logging: true,
  synchronize: true,
};

export const LinksDataSource = new DataSource({
  type: "mariadb",
  host: "localhost",
  port: 3306,
  username: "notbadcode",
  password: "6900",
  database: "links",
  entities: ["src/entity/*.ts"],
  logging: true,
  dateStrings: true,
  trace: true,
  connectorPackage: "mysql",
  logger: "debug",
  maxQueryExecutionTime: 5,
  cache: {
    type: "database",
    duration: 600000, // 10 minutes
    ignoreErrors: true,
  },
});
