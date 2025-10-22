import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  Req,
} from '@nestjs/common';
import { PostsRepository } from '../repository/posts.repository';
import { BuildResponse } from 'src/dto/app.dto';
import { CreatePostsDto, UpdatePostDto } from 'src/dto/posts.dto';

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

  async find(id: any) {
    try {
      let res = await this.postsRepository.find(id);
      if (!res) {
        return new HttpException(
          new BuildResponse('400', 'data not found', {}),
          HttpStatus.BAD_REQUEST,
        );
      }
      return new BuildResponse('00', 'message', res);
    } catch (error) {
      throw new HttpException(
        new BuildResponse('500', error.message, {}),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async create(data: CreatePostsDto) {
    try {
      console.log('check data', data);
      await this.postsRepository.create(data);
      return new BuildResponse('00', 'message', {});
    } catch (error) {
      throw new HttpException(
        new BuildResponse('500', error.message, {}),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, data: UpdatePostDto) {
    try {
      let check = await this.postsRepository.find(id);

      if (!check) {
        return new BuildResponse('400', 'data not found', {});
      }

      await this.postsRepository.update(id, data);
      return new BuildResponse('00', 'message', {});
    } catch (error) {
      throw new HttpException(
        new BuildResponse('500', error.message, {}),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(id: number) {
    try {
      await this.postsRepository.delete(id);

      return new BuildResponse('00', 'message', {});
    } catch (error) {
      throw new HttpException(
        new BuildResponse('500', error.message, {}),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
