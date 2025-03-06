import { ApiProperty } from '@nestjs/swagger';

export class CreatePostResponse {
  @ApiProperty({ description: 'Post id', example: 1 })
  id: number;

  @ApiProperty({ description: 'Post title', example: 'Journey' })
  title: string;

  @ApiProperty({ description: 'Post description', example: 'Some text' })
  description: string;

  @ApiProperty({ description: 'User id', example: 1 })
  userId: number;

  @ApiProperty({ description: 'CreatedAt', example: '2025-03-05T14:15:03.241Z' })
  createdAt: Date;
}

export class DeletePostResponse {
  @ApiProperty({ example: true })
  success: boolean;
}