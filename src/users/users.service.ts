import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  async googleLogin(req: any) {
    if (!req.user) {
      return 'No user from google';
    }
    return {
      message: 'User Info from Google ',
      user: req.user,
    
    };
  }
}
