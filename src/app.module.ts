import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { Env } from './env';
import { User } from './users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
