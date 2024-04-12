import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import { CompanyModule } from './company/company.module';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import {User} from './users/entities/user.entity';
import {Company} from './company/entities/company.entity';
import {Role} from './roles/entities/role.entity';

@Module({
  imports: [
		TypeOrmModule.forRoot({
			type:'mysql',
			host: 'localhost',
			port: 3307,
			username:'user_crud',
			password:'root',
			database:'db_crud',
			autoLoadEntities:true,
			synchronize:true,
			entities: [User, Company, Role],
		}),
		UsersModule,
		CompanyModule,
		AuthModule,
		RolesModule
	],
  controllers: [],
  providers: [],
})
export class AppModule {}
