import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PostsController } from '../controller/posts.controller';
import { DatabaseModule } from 'src/config/database.module';
import { PostsService } from 'src/service/posts.service';
import { PostsRepository } from 'src/repository/posts.repository';
import { LoggerMiddleware } from 'src/middleware/log.middleware';
import { JWTMiddleware } from 'src/middleware/jwt.middleware';

@Module({
  imports: [DatabaseModule],
  controllers: [PostsController],
  providers: [PostsService, PostsRepository],
})
export class PostsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware, JWTMiddleware).forRoutes('/api/post');
  }
}
