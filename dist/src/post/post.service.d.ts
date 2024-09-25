import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { UserService } from 'src/user/user.service';
export declare class PostsService {
    private postRepository;
    private userRepository;
    constructor(postRepository: Repository<Post>, userRepository: UserService);
    create(postData: any): Promise<any>;
    findAll(): Promise<Post[]>;
    findOne(id: number): Promise<Post>;
    update(id: number, postData: any): Promise<{
        message: string;
    }>;
    delete(id: number): Promise<{
        message: string;
    }>;
}
