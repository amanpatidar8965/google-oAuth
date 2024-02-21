import {
  Controller,
  Get,
  UseGuards,
  Req,
  Post,
  Body,
  Res,
  Redirect,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { Response } from 'express'; // Import Response from express

@Controller()
@ApiTags('Users API')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
}
