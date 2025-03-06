import { ApiProperty } from '@nestjs/swagger';

export class GetCommentsList {
  @ApiProperty({ description: 'Post id', example: '1'})
  postId: number;
}

export class LikeCommentDto {
  @ApiProperty({ description: 'Comment id', example: '1'})
  id: number;
}

export class CreateCommentDto {
  @ApiProperty({ description: 'Text Comment', example: 'Cool'})
  text: string;

  @ApiProperty({ description: 'Post id', example: '1'})
  postId: number;
}

export class CreateReplyCommentDto {
  @ApiProperty({ description: 'Text Comment', example: 'Cool'})
  text: string;

  @ApiProperty({ description: 'Parent id', example: '1'})
  parentId: number;
}