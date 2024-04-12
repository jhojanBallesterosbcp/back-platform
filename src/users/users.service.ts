import {BadRequestException, Injectable, InternalServerErrorException, NotFoundException} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from './entities/user.entity';
import {Repository} from 'typeorm';
import {Company} from 'src/company/entities/company.entity';
import {Role} from 'src/roles/entities/role.entity';
import {RoleName} from 'src/roles/rol.enum';
import {MessageDto} from 'src/common/message.dto';

@Injectable()
export class UsersService {

	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
		 
		@InjectRepository(Company)
		private readonly companyRepository: Repository<Company>,
		@InjectRepository(Role)
		private readonly roleRepository: Repository<Role>
	) {}

	async create(createUserDto: CreateUserDto) :Promise<any>{
		const{firstname,email} = createUserDto;
		const exists = await this.userRepository.findOne({where: [{firstname: firstname}, {email: email}]});
		console.log("eixt",exists)
		if(exists) throw new BadRequestException(new MessageDto('ese usuario ya existe'));
		const rolAdmin = await this.roleRepository.findOne({where: {roleName: RoleName.ADMIN}});
		console.log("rolAdmin",rolAdmin)
		const rolUser = await this.roleRepository.findOne({where: {roleName: RoleName.USER}});
		console.log("rolUser",rolUser)
		if(!rolAdmin || !rolUser) throw new InternalServerErrorException(new MessageDto('los roles aún no han sido creados'));
		const user = this.userRepository.create(createUserDto);
		console.log("user",user)
		user.roles = [rolAdmin, rolUser];
		console.log("user1",user)
		return await this.userRepository.save(user);
	
	}

	async findAll():Promise<User[]> {
		const user = await this.userRepository.find();
		if(!user.length)throw new NotFoundException(new MessageDto('No user'));
		return user;
		}

	async findOne(id: number) {
		return await this.userRepository.findOneBy({id});
	}

	async update(id: number,updateUserDto: UpdateUserDto) {
		return await this.userRepository.update(id, updateUserDto);
	}

	async remove(id: number) {
		return await this.userRepository.softDelete({id});
	}
}
