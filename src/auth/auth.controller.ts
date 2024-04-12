import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import {AuthService} from './auth.service';
import {CreateAdminDto} from './dto/create-admin.dto';
import {UpdateAdminDto} from './dto/update-admin.dto';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

  @Post('new')
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.authService.create(createAdminDto);
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.authService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateAdminDto) {
    return this.authService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.authService.remove(id);
  }
}
