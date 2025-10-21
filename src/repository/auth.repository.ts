import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';

@Injectable()
export class PostsRepository {
  constructor(@Inject('KnexConnection') private knex: Knex) {}

  async all() {
    return await this.knex.table('posts');
  }

  async find(id: any) {
    return await this.knex.table('posts').where('id', id).first();
  }

  async create(data: any) {
    return await this.knex.table('posts').insert(data);
  }

  async update(id: number, data: any) {
    return await this.knex.table('posts').where('id', id).update(data);
  }

  async delete(id: number) {
    return await this.knex.table('posts').where('id', id).delete();
  }
}
