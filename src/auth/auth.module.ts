import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from 'src/users/entities/user.entity';
import {Role} from 'src/roles/entities/role.entity';
import {Company} from 'src/company/entities/company.entity';

@Module({
	imports:[TypeOrmModule.forFeature([User,Role, Company])],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
