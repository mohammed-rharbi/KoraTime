import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, Put, UseInterceptors, UploadedFile } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-auth.dto';
import { UpdateUserDto } from './dto/update-auth.dto';
import { LoginUserDto } from './dto/login-auth.dto';
import { multerConfig } from 'src/config/multer.config';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateManagerDto } from './dto/manager-auth.dto';

@Controller('auth')
export class AuthController {
  
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async create(@Body() createAuthDto: CreateUserDto) {

    
    return await this.authService.registerUser(createAuthDto);
  }

  @Post('login')
  async login(@Body() userData: LoginUserDto){

    return await this.authService.login(userData);
  }

  @Put('start')
  @UseInterceptors(FileInterceptor('profilPic', multerConfig))
  async getStarted( @UploadedFile() file : Express.Multer.File ,  @Body() userData: {id: string , location:string , phoneNumber: string}){

    if(!file){
      throw new BadRequestException('Profile picture is required.');
    }
    
    const { phoneNumber , location, id } = userData;
    
    return await this.authService.getstarted(phoneNumber ,location , file.path , id)
    
  }

  @Get('getAll')
  async getAllUsers(){

     
    return await this.authService.getAll()
    
  }

  @Post('createManger')
  async createManger(@Body() createAuthDto: CreateManagerDto) {
      
    console.log(createAuthDto);
    
    return await this.authService.createFieldManager(createAuthDto);
  }

  @Get('getAllManagers')
  async getAllManagers() {

    return await this.authService.getAllManagers();
  }

  @Patch('ban/:action/:id')
  async banUser(@Param('id') id: string, @Param('action') action: string) {

    return await this.authService.banUser(id , action);
  }

}
