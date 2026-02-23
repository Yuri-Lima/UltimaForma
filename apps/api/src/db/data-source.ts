import 'reflect-metadata';
import { config } from 'dotenv';
import { resolve } from 'path';
import { DataSource } from 'typeorm';

config();

const apiRoot = resolve(process.cwd(), 'apps/api/src');
export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: +(process.env.DB_PORT || 5432),
  username: process.env.DB_USERNAME || 'postgres',
  password: String(process.env.DB_PASSWORD ?? ''),
  database: process.env.DB_NAME || 'ultimaforma',
  entities: [resolve(apiRoot, 'app/**/*.entity.{ts,js}')],
  migrations: [resolve(apiRoot, 'migrations/*.{ts,js}')],
  synchronize: false,
  migrationsTableName: 'migrations',
});
