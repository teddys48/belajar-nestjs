import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';

@Injectable()
export class AuthRepository {
  constructor(@Inject('KnexConnection') private knex: Knex) {}

  async find(email: any) {
    return await this.knex.table('users').where('email', email).first();
  }

  async register(data: any) {
    return await this.knex.table('users').insert(data);
  }
}
