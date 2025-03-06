import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, Param, Post, Req } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto, GetPostDto } from './post.dto';
import { CreatePostResponse, DeletePostResponse } from './post.response';
import { IsSecured } from '../../modules/auth.is-secured.decorator';
import { AuthRequest } from '../../modules/auth.interface';

@ApiTags('Posts')
@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService,
  ) {
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get post',
    description: 'Get post by id',
  })
  @ApiResponse({
    status: 200,
    description: 'Post info',
  })
  get(
    @Param() { id }: GetPostDto
  ) {
    return this.postService.get(id);
  }

  @Post('list')
  @ApiOperation({
    summary: 'List posts',
    description: 'List posts',
  })
  @ApiResponse({
    status: 200
  })
  list(
  ) {
    return this.postService.list();
  }

  @Post('')
  @IsSecured()
  @ApiOperation({
    summary: 'Create post',
    description: 'Create post',
  })
  @ApiResponse({
    status: 200,
    description: 'Created post',
    type: CreatePostResponse
  })
  async create(
    @Req() request: AuthRequest,
    @Body() dto: CreatePostDto
  ) {
    return await this.postService.create({ ...dto, user: request.token });
  }

  @Delete(':id')
  @IsSecured()
  @ApiOperation({
    summary: 'Delete post',
    description: 'Delete post by id',
  })
  @ApiResponse({
    status: 200,
    type: DeletePostResponse
  })
  async delete(
    @Req() request: AuthRequest,
    @Param() { id }: GetPostDto,
  ): Promise<{success: boolean}> {
    return await this.postService.delete(id, request.token);
  }
}