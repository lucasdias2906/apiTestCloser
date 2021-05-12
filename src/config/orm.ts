import * as path from 'path';
// import {Module} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

const options: TypeOrmModule = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'lucas',
  password: 'lucas',
  database: 'apiShoppingCart',
  logging: true,
  entities: [path.resolve(__dirname, '..', 'db', 'models', '*')],
  migrations: [path.resolve(__dirname, '..', 'db', 'migrations', '*')],
};

module.exports = options;
