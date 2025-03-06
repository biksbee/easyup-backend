import { ApiProperty } from '@nestjs/swagger';

export class GetPostDto {
  @ApiProperty({ example: 1, description: 'Post id' })
  id: number;
}

export class CreatePostDto {
  @ApiProperty({ example: 'Journey', description: 'Post title' })
  title: string;

  @ApiProperty({ example: 'Some text', description: 'Post title' })
  description: string;
}