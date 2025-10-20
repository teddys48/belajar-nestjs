import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PostsRepository } from './posts.repository';
import { BuildResponse } from 'src/app.dto';

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: PostsRepository) {}

  async getAll() {
    try {
      let res = await this.postsRepository.all();
      return new BuildResponse('00', 'message', res);
    } catch (error) {
      throw new HttpException(
        new BuildResponse('500', error.message, {}),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
