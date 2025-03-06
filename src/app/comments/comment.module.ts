import { CommentController } from './comment.controller';
import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentEntity } from './entity/comment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikeEntity } from './entity/likes.entity';
import { UserModule } from '../user/user.module';
import { PostModule } from '../post/post.module';

@Module({
  controllers: [CommentController],
  providers: [CommentService],
  imports: [
    TypeOrmModule.forFeature([
      CommentEntity,
      LikeEntity
    ]),
    UserModule,
    PostModule
  ],
  exports: [CommentService]
})
export class CommentModule {}