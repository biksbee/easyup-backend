import { ApiProperty } from '@nestjs/swagger';

export class UserResponse {
  @ApiProperty({ description: 'User id', example: 1 })
  id: number;

  @ApiProperty({ description: 'User name', example: 'Jenya' })
  name: string;
}