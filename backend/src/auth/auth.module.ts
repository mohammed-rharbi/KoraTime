import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User , UserSchema } from './entities/auth.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthRepository } from './auth.repository';
import { JwtModule } from '@nestjs/jwt';
import "dotenv/config"

@Module({
  imports: [ 
    
    MongooseModule.forFeature([{ name: User.name , schema: UserSchema }]) , 

    JwtModule.register({ secret: process.env.JWT_SECRET , signOptions: { expiresIn: '3h'}})           
],

    controllers: [AuthController],
    providers: [AuthService , AuthRepository],
    exports: [AuthService]

})
export class AuthModule {}
