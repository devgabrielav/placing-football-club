import { Options } from 'sequelize';
import { parse } from 'pg-connection-string';

let config: Options;

if (process.env.MYSQL_URL) {
  const params = parse(process.env.MYSQL_URL);
  config = {
    username: params.user || '',
    password: params.password,
    database: params.database || '',
    host: params.host || '',
    port: params.port ? parseInt(params.port) : undefined,
    dialect: 'mysql',
    dialectOptions: {
      timezone: 'Z',
    },
    logging: false,
  };
} else {
  config = {
    username: process.env.MYSQLUSER || 'root',
    password: process.env.MYSQLPASSWORD || '123456',
    database: process.env.MYSQLDATABASE || 'PLACING_FOOTBALL_CLUB',
    host: process.env.MYSQLHOST || 'localhost',
    port: process.env.MYSQLPORT ? parseInt(process.env.MYSQLPORT) : 3306,
    dialect: 'mysql',
    dialectOptions: {
      timezone: 'Z',
    },
    logging: false,
  };
}

export = config;
