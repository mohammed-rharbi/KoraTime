import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-auth.dto';
import { UpdateUserDto } from './dto/update-auth.dto';
import { AuthRepository } from './auth.repository';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
import { LoginUserDto } from './dto/login-auth.dto';
import { CreateManagerDto } from "./dto/manager-auth.dto";
import { StartingUserDto } from './dto/starting-auth.dto';


@Injectable()
export class AuthService {

  constructor( private readonly AuthRepository: AuthRepository  ,  private readonly jwtService: JwtService  ){}

  async registerUser(UserData: CreateUserDto) {
    try {

      const {email , password} = UserData

      const existingUser = await this.AuthRepository.findByEmail(email);
      
      if (existingUser) {
        throw new UnauthorizedException('User already exists');
      }

      const salt = await bcrypt.genSalt(10); 
  
      const hashPass = await bcrypt.hash(password, salt);
  
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

      if(user.isBand === true){
        throw new UnauthorizedException('Sorry. You ben banned');
      }
  
      const isPasswordValid = await bcrypt.compare(userData.password, user.password);

      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
      }
        
      const payload = {id: user._id , role: user.role , email: user.email};

      const token = this.jwtService.sign(payload, { expiresIn: '2h' });

      return {message:'user login successfully', token , user}

    }catch(err: any){

      console.log(err.message);
      throw new BadRequestException('there is error while login ', err)
      
    }
  
  }
  async getstarted(userData : StartingUserDto) {
  
    try {

      const updatedUser = await this.AuthRepository.update(userData);
  
      return updatedUser;
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException('Failed to update user profile');
    }
  }



  async getAll(){

    const users =  await this.AuthRepository.findAll();

    if(!users || users.length === 0){

      throw new NotFoundException('no users ben Found')
    }

    return users
  }

  
  async getAllManagers(){

    const Managers =  await this.AuthRepository.getAllManagers();

    if(!Managers || Managers.length < 0){

      throw new NotFoundException('no users ben Found')
    }

    return Managers
  }


  async getAllPlayers(){

    const Players =  await this.AuthRepository.getAllPlayers();

    if(!Players || Players.length < 0){

      throw new NotFoundException('no users ben Found')
    }

    return Players
  }


  async createFieldManager(managerData: CreateManagerDto) {

    try {

      const { email, password } = managerData;
  
      if (!password) {
        throw new BadRequestException("Password is required");
      }
  
      const existingUser = await this.AuthRepository.findByEmail(email);
      if (existingUser) {
        throw new UnauthorizedException("Manager already exists");
      }
  
      const salt = await bcrypt.genSalt(10);
      const hashPass = await bcrypt.hash(password, salt);
      if (!hashPass) {
        throw new Error("Password hashing failed");
      }
  
      const newManager = {
        ...managerData,
        password: hashPass,
        role: "fieldManager",
      };
  
      return await this.AuthRepository.create(newManager);

    } catch (err: any) {
      console.error("Registration error:", err.message);
      throw new BadRequestException({
        message: "Error while registering a user",
        error: err.message,
      });
    }
  }

    async banUser(id:string , action:string){

      if(action === 'ban'){

        const user =  await this.AuthRepository.ban(id)

        return user

      }else if(action === 'unban'){
        
        const user =  await this.AuthRepository.unban(id)

        return user

      }
      

  }

  
}
