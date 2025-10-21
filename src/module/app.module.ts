import { Module } from '@nestjs/common';
import { PostsModule } from './posts.module';
import { AppController } from 'src/controller/app.controller';
import { AppService } from 'src/service/app.service';

@Module({
  imports: [PostsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
