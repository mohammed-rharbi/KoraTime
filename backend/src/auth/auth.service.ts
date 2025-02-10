import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-auth.dto';
import { UpdateUserDto } from './dto/update-auth.dto';
import { AuthRepository } from './auth.repository';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
import { LoginUserDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {

  constructor( private readonly AuthRepository: AuthRepository  ,  private readonly jwtService: JwtService  ){}

  async registerUser(UserData: CreateUserDto) {
    try {


      const {userName , email , password} = UserData

      const existingUser = await this.AuthRepository.findByEmail(email);
      
      if (existingUser) {
        throw new UnauthorizedException('User already exists');
      }
  
      const hashPass = await bcrypt.hash(password, 10);
  
      const newUser = {
        ...UserData,
        password: hashPass,
      };
  
      const user =  await this.AuthRepository.create(newUser);
      
      
      return { message: 'User registered successfully' , user };

    } catch (err: any ) {
      console.error('Registration error:', err.message);
      throw new BadRequestException({ message: 'Error while registering a user', error: err.message });
    }
  }

  async login( userData: LoginUserDto ) {

    try{

      const user = await this.AuthRepository.findByEmail(userData.email);

      
      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }
  
      const isPasswordValid = await bcrypt.compare(userData.password, user.password);

      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
      }
        
      const payload = {id: user._id , role: user.role , email: user.email};

      const token = this.jwtService.sign(payload, { expiresIn: '2h' });
      console.log(token);


      return {message:'user login successfully', token , user}

    }catch(err: any){

      console.log(err.message);
      throw new BadRequestException('there is error while login ', err)
      
    }
  
  }
  async getstarted(phoneNumber: string, profilePic: string, id: string) {

    if (!phoneNumber || !profilePic || !id) {
      throw new BadRequestException('All fields are required.');
    }
  
    const userData = {
      profilePic,
      phoneNumber,
    };
  
    try {

      const updatedUser = await this.AuthRepository.update(id, userData);
  
      return updatedUser;
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException('Failed to update user profile');
    }
  }

}
