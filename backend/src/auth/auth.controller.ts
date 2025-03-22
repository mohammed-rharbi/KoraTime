import { Controller, Get, Post, Body, Patch, Param, UseGuards ,Delete, BadRequestException, Put, UseInterceptors, UploadedFile } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-auth.dto';
import { UpdateUserDto } from './dto/update-auth.dto';
import { LoginUserDto } from './dto/login-auth.dto';
import { CreateManagerDto } from './dto/manager-auth.dto';
import { StartingUserDto } from './dto/starting-auth.dto';
import { JwtAuthGuard } from 'src/common/jwt-auth.guard';


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
  async getStarted( @Body() userData: StartingUserDto){

    return await this.authService.getstarted(userData)
    
  }

  @Get('getAll')
  @UseGuards(JwtAuthGuard)
  async getAllUsers(){

     
    return await this.authService.getAll()
    
  }

  @Post('createManger')
  @UseGuards(JwtAuthGuard)
  async createManger(@Body() createAuthDto: CreateManagerDto) {
      
    console.log(createAuthDto);
    
    return await this.authService.createFieldManager(createAuthDto);
  }

  @Get('getAllManagers')
  @UseGuards(JwtAuthGuard)
  async getAllManagers() {

    return await this.authService.getAllManagers();
  }

  @Get('getAllPlayers')
  @UseGuards(JwtAuthGuard)
  async getAllPlayers() {

    return await this.authService.getAllPlayers();
  }


  
  @Get('getPlayer/:id')
  @UseGuards(JwtAuthGuard)
  async getPlayer(@Param('id') id: string) {

    return await this.authService.getUserPlayer(id);
  }


  @Patch('ban/:action/:id')
  @UseGuards(JwtAuthGuard)
  async banUser(@Param('id') id: string, @Param('action') action: string) {

    return await this.authService.banUser(id , action);
  }

}
