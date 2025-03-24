import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User , UserSchema } from './entities/auth.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthRepository } from './auth.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import "dotenv/config"

@Module({
  imports: [ 
    
    MongooseModule.forFeature([{ name: User.name , schema: UserSchema }]) , 

    JwtModule.register({ secret: process.env.JWT_SECRET , signOptions: { expiresIn: '3h'}}) ,
    ConfigModule.forRoot(),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '2h' },
      }),
    }),        
],

    controllers: [AuthController],
    providers: [AuthService , AuthRepository , JwtStrategy],
    exports: [AuthService , AuthRepository , JwtStrategy]

})
export class AuthModule {}
