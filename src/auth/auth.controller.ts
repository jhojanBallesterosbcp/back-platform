import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, Request } from '@nestjs/common';
import {AuthService} from './auth.service';
import {RegisterDto} from './dto/register.dto';
import {LoginDto} from './dto/login.dto';
import {AuthGuard} from './guards/auth.guard';
import {User} from 'src/users/entities/user.entity';
import {JwtService} from '@nestjs/jwt';

interface RequestWithUser extends Request {
  user: {
    email: string;
    role: string;
  };   
} 

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService,
		private readonly jwtService: JwtService,
	) {}

	@Post('register')
  register(
    @Body()
    registerDto: RegisterDto,
  ) {
    return this.authService.register(registerDto);
  }
   
  @Post('login')
  login(
    @Body()
    loginDto: LoginDto,
  ) {
    return this.authService.login(loginDto);
  }

	@UseGuards( AuthGuard)
	@Get('check-token')
	async checkToken( @Request() req: Request){
		const user = req['user'] as User 	
	const token= await  this.jwtService.signAsync({id:user.id})
		return {
			user,
			token 
		} ;
	}
	
/*  @Get('profile')
  //@Auth(Role.USER)
  profile(@ActiveUser() user: UserActiveInterface) {
    console.log(user)
    return this.authService.profile(user);
  }*/


}
