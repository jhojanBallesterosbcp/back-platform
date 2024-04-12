import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Company} from 'src/company/entities/company.entity';
import {Role} from 'src/roles/entities/role.entity';
import {User} from 'src/users/entities/user.entity';
import {Repository} from 'typeorm';
import {CreateAdminDto} from './dto/create-admin.dto';
import {MessageDto} from 'src/common/message.dto';
import {RoleName} from 'src/roles/rol.enum';
import {UpdateAdminDto} from './dto/update-admin.dto';

@Injectable()
export class AuthService {
	remove(id: number) {
		throw new Error('Method not implemented.');
	}
	update(id: number,updateUserDto: UpdateAdminDto) {
		throw new Error('Method not implemented.');
	}
	findOne(id: number) {
		throw new Error('Method not implemented.');
	}
	constructor(
		@InjectRepository(User)
		private readonly authRepository: Repository<User>,
		 
		@InjectRepository(Company)
		private readonly companyRepository: Repository<Company>,

		@InjectRepository(Role)
		private readonly roleRepository: Repository<Role>
	) {}

	async findAll():Promise<User[]> {
		const user = await this.authRepository.find();
		if(!user.length)throw new NotFoundException(new MessageDto('No user'));
		return user;
		}
		
	async create(createUserDto: CreateAdminDto) :Promise<any>{
		const{firstname,email} = createUserDto;
		const exists = await this.authRepository.findOne({where: [{firstname: firstname}, {email: email}]});
		console.log("eixt",exists)
		if(exists) throw new BadRequestException(new MessageDto('ese usuario ya existe'));
		
		const rolUser = await this.roleRepository.findOne({where: {roleName: RoleName.USER}});

		if(!rolUser) throw new InternalServerErrorException(new MessageDto('los roles aún no han sido creados'));
		const user = this.authRepository.create(createUserDto);
		console.log("user",user)
		user.roles = [ rolUser];
		await this.authRepository.save(user);
return new MessageDto('Admin create')
	
	}
}
