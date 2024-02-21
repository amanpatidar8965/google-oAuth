import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { Response } from 'express';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authservice: AuthService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Req() req) {
    return this.authservice.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('test')
  async data() {
    return 'success';
  }

  @Get()
  @UseGuards(AuthGuard('google'))
  async googolAuth(@Req() req) {}

  @Get('auth/google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res: Response) {
    try {
      const jwt = await this.authservice.login(req.user);
      res.set('authorization', jwt.access_token);
      // res.json(req.user);
      res.redirect('http://localhost:3000/api#/');
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  @Get('test123')
  @UseGuards(AuthGuard('jwt'))
  async test123(@Res() res) {
    res.json('success');
  }
}
