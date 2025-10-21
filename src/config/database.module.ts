import { Module } from '@nestjs/common';
import { configDotenv } from 'dotenv';
import knex, { Knex } from 'knex';

configDotenv();

const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD } = process.env;

const knexProvider = {
  provide: 'KnexConnection',
  useFactory: (): Knex => {
    return knex({
      client: 'pg',
      connection: {
        host: DB_HOST,
        port: Number(DB_PORT),
        database: DB_NAME,
        user: DB_USER,
        password: String(DB_PASSWORD),
      },
    });
  },
};

@Module({
  providers: [knexProvider],
  exports: [knexProvider],
})
export class DatabaseModule {}
