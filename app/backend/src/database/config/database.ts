import { Options } from 'sequelize';

const config: Options = {
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
}

export = config;