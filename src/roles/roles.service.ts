import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {Role} from './entities/role.entity';
import {Repository} from 'typeorm';
import {RoleName} from './rol.enum';

@Injectable()
export class RolesService {

	constructor(
		@InjectRepository(Role)
		private readonly roleRepository: Repository<Role>
	){}
  async create(createRoleDto: CreateRoleDto):Promise<any> {
		const roleName: RoleName = createRoleDto.roleName as RoleName;
		const exist = await this.roleRepository.findOne({where:{roleName}}); 
		if(exist) throw new BadRequestException(new Error('Already exist'));
		await this.roleRepository.save(createRoleDto as Role)
    return 'rol creado ';
  }

 async findAll():Promise<Role[]> { 
	const roles = await this.roleRepository.find();
	if(!roles.length)throw new NotFoundException(new Error('No Roles'));
	return roles;
	

  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }
  
  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
