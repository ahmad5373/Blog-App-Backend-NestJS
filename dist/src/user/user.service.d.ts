import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    create(userData: any): Promise<User>;
    findOneByEmail(email: string): Promise<User | undefined>;
    findAll(): Promise<User[]>;
    findOne(userId: number): Promise<User>;
}
