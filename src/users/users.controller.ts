import { Controller, Get, Post, Body, Patch, Param, Delete, Request, Res, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {User} from './entities/user.entity';
import {JwtService} from '@nestjs/jwt';
import {AuthGuard} from 'src/auth/guards/auth.guard';
import {Company} from 'src/company/entities/company.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService,
		private readonly jwtService: JwtService,
	) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

@UseGuards(AuthGuard)
  @Get()
  async findAll(@Request() req: Request) {
		const user = req['user'] as User 
    return {user};
  }


  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usersService.remove(id);
  }
}
