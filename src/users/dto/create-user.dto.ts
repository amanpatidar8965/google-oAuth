import { IsEmail, IsOptional, IsString, isString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  userName: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  googleId: string;
}
