import { Module } from '@nestjs/common';
import { AgentController } from './agent.controller';
import { AgentService } from './agent.service';
import {HttpModule} from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
	imports: [
    ConfigModule.forRoot({
			isGlobal:true
		}),
    HttpModule],
  controllers: [AgentController],
  providers: [AgentService]
})
export class AgentModule {}
