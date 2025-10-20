import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';

@Injectable()
export class PostsRepository {
  constructor(@Inject('KnexConnection') private knex: Knex) {}

  async all() {
    return await this.knex.table('posts');
  }
}
