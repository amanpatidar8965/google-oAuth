import { JwtService } from '@nestjs/jwt';
import { UsersService } from './../users/users.service';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VeriyfyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { Env } from 'src/env';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly usersService: UsersService,
    private jwtService: JwtService) {
    super({
      clientID: Env.GOOGLE_CLIENT_ID,
      clientSecret: Env.GOOGLE_CLIENT_SECRET,
      callbackURL: Env.GOOGLE_CALLBACK_URL,
      scope: ['email', 'profile'],
    });
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VeriyfyCallback,
  ): Promise<any> {
    // const { name, emails, photos } = profile;
    const { id, displayName  , emails} = profile;
    const email = emails[0].value;
    const user = await this.usersService.saveUser(
      id,
      displayName,
      email,
      accessToken,
      refreshToken,
    );
    // const user = {
    //   email: emails[0].value,
    //   firstName: name.givenName,
    //   lastName: name.familyName,
    //   picture: photos[0].value,
    //   accessToken,
    //   refreshToken,
    // };

     // Generate JWT token
     const jwtPayload = { userId: user.id }; // Customize as needed
     const token = this.jwtService.sign(jwtPayload);
    done(null, token);
    console.log(profile);
  }
}
