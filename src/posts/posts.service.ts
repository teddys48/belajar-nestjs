import { Injectable } from '@nestjs/common';

@Injectable()
export class PostsService {
  async getAll() {
    return 'test get all';
  }
}
