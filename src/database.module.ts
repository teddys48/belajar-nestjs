import { Module } from '@nestjs/common';
import knex, { Knex } from 'knex';

const knexProvider = {
  provide: 'KnexConnection',
  useFactory: (): Knex => {
    return knex({
      client: 'pg',
      connection: {
        host: 'localhost',
        port: 5432,
        database: 'laravel-crud',
        user: 'postgres',
        password: 'galau712',
      },
    });
  },
};

@Module({
  providers: [knexProvider],
  exports: [knexProvider],
})
export class DatabaseModule {}
