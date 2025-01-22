import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-auth.dto';
import { UpdateUserDto } from './dto/update-auth.dto';
import { AuthRepository } from './auth.repository';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {

  constructor( private readonly AuthRepository: AuthRepository  ,  private readonly jwtService: JwtService  ){}

  async registerUser(UserData: CreateUserDto) {
    try {


      const {firstName , lastName , email , password} = UserData

      const existingUser = await this.AuthRepository.findByEmail(email);
      if (existingUser) {
        throw new UnauthorizedException('User already exists');
      }
  
      const hashPass = await bcrypt.hash(password, 10);
  
      const newUser = {
        ...UserData,
        password: hashPass,
      };

      console.log(newUser);
  
      await this.AuthRepository.create(newUser);
      
      
      return { message: 'User registered successfully' };

    } catch (err: any ) {
      console.error('Registration error:', err.message);
      throw new BadRequestException({ message: 'Error while registering a user', error: err.message });
    }
  }

  async login( email: string , password: string ) {

    try{

      const user = await this.AuthRepository.findByEmail(email);

      if(!user || !(await bcrypt.compare(password , user.password))){

        throw new UnauthorizedException('invalid info');
      }

      const payload = {id: user._id , role: user.role , email: user.email};
      const token = this.jwtService.sign(payload);

      return {message:'user login successfully', token , user}

    }catch(err: any){
      console.log(err.message);
      throw new BadRequestException('there is error while login ', err)
      
    }
  
  }

}
