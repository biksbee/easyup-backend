import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CheckUserType, CreateUserType, GenerateTokenPayloadType } from './user.type';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {
  }

  async get(id: number): Promise<UserEntity | null> {
    return await this.userRepository.findOne({
      select: ['id', 'name', 'password'],
      where: {
        id,
      },
    });
  }

  async login(data: CreateUserType){
    const user = await this.userRepository.findOne({
      select: ['id', 'name', 'password'],
      where: { name: data.name },
    });
    if (!user) {
      throw new BadRequestException();
    }
    const obj = {id: user.id, password: data.password};
    await this.checkPassword(obj);
    return {
      ...await this.get(user.id),
      token: await this.generateToken(obj)
    }
  }

  async create(data: CreateUserType) {
    const candidate = await this.userRepository.findOneBy({ name: data.name });
    if (candidate) {
      throw new BadRequestException('User with the same name already exists');
    }
    const instanceUserEntity = this.userRepository.create(data);
    const user = await this.userRepository.save(instanceUserEntity);

    return {
      ...await this.get(user.id),
      token: await this.generateToken({ id: user.id, password: data.password }),
    };
  }

  async checkPassword(data: CheckUserType): Promise<boolean> {
    const user = await this.get(data.id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const match = await bcrypt.compare(data.password, user.password);
    if (!match) {
      throw new UnauthorizedException('Incorrect login data');
    }
    return true;
  }

  async generateToken(payload: GenerateTokenPayloadType) {
    const expiresIn = this.configService.get<string>('TOKEN_LIFE_TIME');
    const secret = this.configService.get<string>('TOKEN_SECRET');
    return this.jwtService.sign(payload, {
      secret,
      expiresIn,
    });
  }
}