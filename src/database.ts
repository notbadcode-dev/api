import * as mariadb from "mariadb";

const createPoolConfigBase: mariadb.PoolConfig = {
  host: "localhost",
  user: "notbadcode",
  password: "6900",
  connectionLimit: 5,
  checkDuplicate: true,
};

const linkPoolConfig = JSON.parse(JSON.stringify(createPoolConfigBase));
linkPoolConfig.database = "links";

const authPoolConfig = JSON.parse(JSON.stringify(createPoolConfigBase));
authPoolConfig.database = "auth";

export const connection = {
  links: mariadb.createPool(linkPoolConfig),
  auth: mariadb.createPool(authPoolConfig),
};
