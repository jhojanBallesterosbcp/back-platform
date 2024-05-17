import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import { CompanyModule } from './company/company.module';
import { AuthModule } from './auth/auth.module';

import {User} from './users/entities/user.entity';
import {Company} from './company/entities/company.entity';
import { ContactModule } from './contact/contact.module';
import {Contact} from './contact/entities/contact.entity';
import { AgentModule } from './agent/agent.module';
import {ConfigModule} from '@nestjs/config';


@Module({
  imports: [
		ConfigModule.forRoot({envFilePath:['.env']}),
		TypeOrmModule.forRoot({
			type:'mysql',
			host: 'localhost',
			port: 3307,
			username:'user_crud',
			password:'root',
			database:'db_crud',
			autoLoadEntities:true,
			synchronize:true,
			entities: [User, Company, 
				Contact
			],
		}),
		UsersModule,
		CompanyModule,
		AuthModule,
		ContactModule,
		AgentModule,
	],
  controllers: [],
  providers: [],
})
export class AppModule {}
