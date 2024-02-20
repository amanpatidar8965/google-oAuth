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

  @Get()
  @UseGuards(AuthGuard('google'))
  googolAuth(@Req() req) {}

  @Get('auth/google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res: Response) {
    const response = await this.usersService.googleLogin(req);
    return res.redirect('http://localhost:3000/api#/');
  }

  @Post('login')
  async loginUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.loginUser(createUserDto);
  }
}
