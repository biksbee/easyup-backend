import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, GetUserDto } from './user.dto';
import { UserResponse } from './user.response';
import { IsSecured } from '../../modules/auth.is-secured.decorator';
import { AuthRequest } from '../../modules/auth.interface';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  @ApiOperation({
    summary: 'Login',
    description: 'Login',
  })
  @ApiResponse({
    status: 200,
    type: UserResponse,
  })
  async login(
    @Body() dto: CreateUserDto
  ) {
    return await this.userService.login(dto);
  }

  @Post('')
  @ApiOperation({
    summary: 'Create user',
    description: 'This endpoint allows to create user',
  })
  @ApiResponse({
    status: 200,
    description: 'Created user',
    type: UserResponse,
  })
  async create(@Body() dto: CreateUserDto) {
    return await this.userService.create(dto);
  }

  @Get(':id')
  @IsSecured()
  @ApiOperation({
    summary: 'Confirm user',
    description: 'This endpoint allows to confirm user',
  })
  @ApiResponse({
    status: 200,
  })
  checkPassword(
    @Param() { id }: GetUserDto,
    @Req() request: AuthRequest,
  ): Promise<boolean> {
    return this.userService.checkPassword(request.token);
  }
}
