import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { HashingProvider } from 'src/auth/providers/hashing.provider';
import { CreateUserProvider } from './providers/create-user.provider';

@Injectable()
export class UsersService {
  constructor(
    // inject user repository
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    // inject provider untuk create user dengan hashing password
    private readonly createUserProvider: CreateUserProvider,
  ) {}

  async create(createUserDto: CreateUserDto) {
   return await this.createUserProvider.createUser(createUserDto);
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({where: {id}, relations: {
      carts: {
        items: true,
      },
      wishlist: {
        items: true,
      },
    }})
    return user;
  }
}
