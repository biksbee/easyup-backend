import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCommentType } from './comment.type';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from './entity/comment.entity';
import { Repository } from 'typeorm';
import { CheckUserType } from '../user/user.type';
import { UserService } from '../user/user.service';
import { PostService } from '../post/post.service';
import { LikeEntity } from './entity/likes.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private commentRepository: Repository<CommentEntity>,
    @InjectRepository(LikeEntity)
    private likeRepository: Repository<LikeEntity>,
    private readonly userService: UserService,
    private readonly postService: PostService,
  ) {}

  async get(id: number) {
    return await this.commentRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  async create(data: CreateCommentType, user: CheckUserType) {
    const owner = await this.userService.get(user.id);
    if (!owner) {
      throw new BadRequestException();
    }

    const obj = await (async () => {
      if (data.postId) {
        const post = await this.postService.getById(data.postId);
        if (!post) {
          return null;
        }
        return { post };
      } else if (data.parentId) {
        const parent = await this.get(data.parentId);
        if (!parent) {
          return null;
        }
        return { parent };
      }
    })();
    if (!obj) {
      throw new BadRequestException();
    }
    const instanceCommentEntity = this.commentRepository.create({
      ...data,
      author: owner.name,
      user: owner,
      ...obj,
    });
    const comment = await this.commentRepository.save(instanceCommentEntity);
    return await this.get(comment.id);
  }

  async list(postId: number) {
    return await this.commentRepository
      .createQueryBuilder("comment")
      .leftJoinAndSelect("comment.replies", "replies")
      .leftJoin("comment.likes", "likes")
      .where("comment.postId = :postId", { postId })
      .loadRelationCountAndMap("comment.likeCount", "comment.likes")
      .getMany();
  }

  async likeComment(id: number, user: CheckUserType) {
    const comment = await this.get(id);
    if (!comment || comment.user.id === user.id) {
      throw new BadRequestException();
    }
    const owner = await this.userService.get(user.id);
    if (!owner) {
      throw new BadRequestException();
    }
    const like = await this.likeRepository.findOneBy({ comment: { id }, user: { id: owner.id }})
    if (like) {
      throw new BadRequestException('You can\'t like this comment twice');
    }
    const instanceLikeEntity = this.likeRepository.create({
      user,
      comment,
    });
    await this.likeRepository.save(instanceLikeEntity);
    return true;
  }
}
