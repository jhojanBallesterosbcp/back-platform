import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from './entities/user.entity';
import {Company} from 'src/company/entities/company.entity';

@Module({
	imports: [TypeOrmModule.forFeature([User,Company])],
  controllers: [UsersController],
  providers: [UsersService],
	
})
export class UsersModule {}
 