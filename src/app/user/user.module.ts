import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { FingerprintMiddleware } from '../../modules/fingerprint.middleware';
import { JwtModule } from '@nestjs/jwt';
import * as process from 'process';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    JwtModule.register({
      secret: process.env.TOKEN_SECRET || 'secret',
      signOptions: {
        expiresIn: '24h',
      },
    }),
    TypeOrmModule.forFeature([
      UserEntity
    ])
  ],
  exports: [
    UserService,
    JwtModule
  ]
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(FingerprintMiddleware).forRoutes(UserController);
  }
}