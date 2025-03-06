import { Module } from '@nestjs/common';
import { PostEntity } from './post.entity';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [PostController],
  providers: [PostService],
  imports: [
    TypeOrmModule.forFeature([
      PostEntity
    ]),
    UserModule
  ],
  exports: [PostService],
})
export class PostModule {}