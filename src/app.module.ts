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
		ConfigModule.forRoot({
			isGlobal:true
		}),
		TypeOrmModule.forRoot({
			type:'postgres',
			host: process.env.POSTGRES_HOST,
			port: parseInt( process.env.POSTGRES_PORT),
			username: process.env.POSTGRES_USERNAME,
			password: process.env.POSTGRES_PASSWORD,
			database: process.env.POSTGRES_DATABASE,
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
