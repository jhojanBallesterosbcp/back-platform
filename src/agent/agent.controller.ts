import { Body, Controller, Get, Post } from '@nestjs/common';
import {AgentService} from './agent.service';

@Controller('agent')
export class AgentController {
constructor (
private readonly agentService: AgentService
){}


@Post('converse')
async converse(@Body() body: {query:string}){
	return this.agentService.converse(body.query);
}
}
