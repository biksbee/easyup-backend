import { ApiProperty } from '@nestjs/swagger';

export class GetUserDto {
  @ApiProperty({ description: 'User id', example: 1 })
  id: number;
}

export class CreateUserDto {
  @ApiProperty({ example: 'Jenya', description: 'User name' })
  name: string;

  @ApiProperty({ example: '12345', description: 'User password' })
  password: string;
}