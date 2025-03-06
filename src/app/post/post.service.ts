import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreatePostType } from './post.type';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from './post.entity';
import { Repository } from 'typeorm';
import { ParsedToken } from '../../modules/auth.interface';
import { UserService } from '../user/user.service';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
    private readonly userService: UserService,
  ) {
  }

  async getById(id: number): Promise<PostEntity | null> {
    return await this.postRepository.findOneBy({ id });
  }

  async get(id: number): Promise<PostEntity | null> {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['user']
    });
    if (!post) {
      throw new NotFoundException();
    }
    return post;
  }

  async getByTitle(title: string): Promise<PostEntity | null> {
    return await this.postRepository.findOneBy({ title });
  }

  async create(data: CreatePostType) {
    const { user: token, ...obj } = data;
    await this.userService.checkPassword(token)
    const existPost = await this.getByTitle(data.title);
    if (existPost) {
      throw new BadRequestException('Post with the same title already exists');
    }
    const instancePostEntity = this.postRepository.create({ ...obj, userId: token.id });
    const post = await this.postRepository.save(instancePostEntity);
    return await this.get(post.id);

  }

  async delete(id: number, user: ParsedToken): Promise<{success: boolean}> {
    const existPost = await this.postRepository.findOneBy({ id });
    if (!existPost) {
      throw new NotFoundException();
    }
    await this.postRepository.delete(id);
    return { success: true };
  }

  async list() {
    return await this.postRepository.find({
      relations: ['user']
    })
  }
}