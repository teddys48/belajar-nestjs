import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { DatabaseModule } from 'src/config/database.module';
import { LoggerMiddleware } from 'src/middleware/log.middleware';
import { AuthController } from 'src/controller/auth.controller';
import { AuthService } from 'src/service/auth.service';
import { AuthRepository } from 'src/repository/auth.repository';
import { RefreshTokenMiddleware } from 'src/middleware/jwt.middleware';

@Module({
  imports: [DatabaseModule],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('/api/auth');
    consumer.apply(RefreshTokenMiddleware).forRoutes('/api/auth/refresh-token');
  }
}
