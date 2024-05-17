import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from './entities/user.entity';
import {Company} from 'src/company/entities/company.entity';
import {CompanyService} from 'src/company/company.service';
import {AgentService} from 'src/agent/agent.service';
import {HttpModule} from '@nestjs/axios';
import {AuthService} from 'src/auth/auth.service';


@Module({
	imports: [TypeOrmModule.forFeature([User, Company]),
HttpModule],
  controllers: [UsersController],
  providers: [UsersService, CompanyService, AgentService, AuthService],
	exports:[UsersService, CompanyService, AgentService, AuthService]
})
export class UsersModule {}
 