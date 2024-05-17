import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import {Company} from './entities/company.entity';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ContactModule} from 'src/contact/contact.module';
import {Contact} from 'src/contact/entities/contact.entity';
import {AuthModule} from 'src/auth/auth.module';
import {AuthService} from 'src/auth/auth.service';
import {User} from 'src/users/entities/user.entity';
import {UsersService} from 'src/users/users.service';

@Module({
	imports: [TypeOrmModule.forFeature([Company, User]), ContactModule],
  controllers: [CompanyController],
  providers: [CompanyService, Contact, AuthService, UsersService],
	exports:[TypeOrmModule, AuthService, UsersService]
})
export class CompanyModule {}
