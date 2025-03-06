import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import process from 'node:process';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './app/database/database.module';
import { PostModule } from './app/post/post.module';
import { UserModule } from './app/user/user.module';
import { CommentModule } from './app/comments/comment.module';
import { FingerprintMiddleware } from './modules/fingerprint.middleware';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './modules/auth.guards';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    DatabaseModule,
    UserModule,
    PostModule,
    CommentModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ]
})
export class AppModule {
}
