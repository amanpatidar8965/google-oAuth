import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async googleLogin(req: any) {
    if (!req.user) {
      return 'No user from google';
    }
    return {
      message: 'User Info from Google ',
      user: req.user,
    };
  }

  async loginUser(createUserDto: CreateUserDto) {
    return 'user login successfully';
  }

  async saveUser(
    id: string,
    displayName: string,
    email:string,
    accessToken: string,
    refreshToken:string,
  ): Promise<User> {
    // Save the user to the database
    const user = await this.userRepository.create({
      userName: displayName,
      googleId: id,
      email:email,
    });
    return this.userRepository.save(user);
  }
}
