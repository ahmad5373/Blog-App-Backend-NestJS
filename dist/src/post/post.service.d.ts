import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { UserService } from 'src/user/user.service';
import { CommentService } from 'src/comment/comment.service';
export declare class PostsService {
    private readonly postRepository;
    private readonly commentService;
    private userService;
    constructor(postRepository: Repository<Post>, commentService: CommentService, userService: UserService);
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
