import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { GoogleStrategy } from 'src/google-strategy/google.strategy';

@Module({
  controllers: [UsersController],
  providers: [UsersService , GoogleStrategy],
})
export class UsersModule {}
