import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { CommentService } from './comment.service';
import {
  CreateCommentDto,
  CreateReplyCommentDto,
  GetCommentsList, LikeCommentDto,
} from './comment.dto';
import { IsSecured } from '../../modules/auth.is-secured.decorator';
import { AuthRequest } from '../../modules/auth.interface';

@ApiTags('Comment')
@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get(':postId')
  @ApiOperation({
    summary: 'List of comments',
    description: 'List of comments',
  })
  @ApiResponse({
    status: 200,
  })
  async list(@Param() { postId }: GetCommentsList) {
    return await this.commentService.list(postId);
  }

  @Post(':id/reply')
  @IsSecured()
  @ApiOperation({
    summary: 'Create reply comment',
    description: 'Create reply comment',
  })
  @ApiResponse({
    status: 200,
    description: 'Created reply comment',
  })
  async reply(@Req() request: AuthRequest, @Body() dto: CreateReplyCommentDto) {
    return await this.commentService.create(dto, request.token);
  }

  @Post('')
  @IsSecured()
  @ApiOperation({
    summary: 'Create a comment',
    description: 'Create a comment',
  })
  @ApiResponse({
    status: 200,
    description: 'Created comment',
  })
  async create(@Req() request: AuthRequest, @Body() dto: CreateCommentDto) {
    return await this.commentService.create(dto, request.token);
  }

  @Get(':id/upvote')
  @IsSecured()
  async likeComment(
    @Req() request: AuthRequest,
    @Param() {id}: LikeCommentDto,
  ) {
    return await this.commentService.likeComment(id, request.token)
  }
}
