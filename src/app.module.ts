import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { Env } from './env';
import { User } from './users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginModule } from './login/login.module';
import { TestModule } from './test/test.module';
import { Authmodule } from './auth/auth.module';
import { LoginController } from './login/login.controller';
import { TestController } from './test/test.controller';
import { LoginService } from './login/login.service';
import { TestService } from './test/test.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: Env.DATABASE.HOST,
      port: Env.DATABASE.PORT,
      username: Env.DATABASE.DB_USER,
      password: Env.DATABASE.DB_PASSWORD,
      database: Env.DATABASE.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true,
      entities: [User],
    }),
    UsersModule,
    LoginModule,
    TestModule,
    Authmodule,
  ],
  controllers: [AppController , LoginController , TestController],
  providers: [AppService , LoginService , TestService],
})
export class AppModule {}
