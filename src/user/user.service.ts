import { Get, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(userData: any): Promise<User> {
    console.log("user created here ....");
    return this.userRepository.save(userData);
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  @Get()
  async findAll() {
    return this.userRepository.find();
  }

 async findOne(userId: number): Promise<User> {
    return this.userRepository.findOne({ where: { id:userId } });
  }
}
