import { UsersService } from './../users/users.service';
import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "./local.strategy";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./jwt.strategy";
import { GoogleStrategy } from "src/google-strategy/google.strategy";
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';

@Module({
    imports:[PassportModule , JwtModule.register({
        secret:'test',
        signOptions: {expiresIn:'60s'}
    }),
    PassportModule.register({ defaultStrategy: 'google' }),
    TypeOrmModule.forFeature([User]),
],
    providers:[AuthService ,LocalStrategy , JwtStrategy , GoogleStrategy , UsersService],
    exports:[AuthService]
})
export class Authmodule {

}