import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { CompanyService } from './company.service';
import {CreateCompanyDto} from './dto/create-company.dto';
import {AuthGuard} from 'src/auth/guards/auth.guard';
import {Company} from './entities/company.entity';



@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.create(createCompanyDto);
  }
@UseGuards(AuthGuard)
  @Get()
  async findAll(@Request() req:Request) {
		const company = req['user'].company as Company
    return this.companyService.findWithUsers(company.id);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.companyService.findOne(id);
  }
/*
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companyService.update(id, updateCompanyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.companyService.remove(id);
  }*/
}
