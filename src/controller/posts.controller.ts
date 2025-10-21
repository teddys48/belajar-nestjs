import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PostsService } from '../service/posts.service';
import { CreatePostsDto, UpdatePostDto } from 'src/dto/posts.dto';

@Controller()
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('/api/post')
  async getAll() {
    return await this.postsService.getAll();
  }

  @Get('/api/post/find')
  async find(@Query() query: { id?: number }) {
    const { id } = query;
    return await this.postsService.find(id);
  }

  @Post('/api/post/create')
  async create(@Body() data: CreatePostsDto) {
    return await this.postsService.create(data);
  }

  @Post('/api/post/update')
  async update(@Body() data: UpdatePostDto, @Query() query: { id: number }) {
    const { id } = query;
    return await this.postsService.update(id, data);
  }

  @Get('/api/post/delete')
  async delete(@Query() query: { id: number }) {
    const { id } = query;
    return await this.postsService.delete(id);
  }
}
