import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { PostsService } from 'src/post/post.service';
export declare class CommentService {
    private readonly commentRepository;
    private readonly postRepository;
    constructor(commentRepository: Repository<Comment>, postRepository: PostsService);
    create(comment: any): Promise<Comment>;
    findAll(): Promise<Comment[]>;
    findPostAllComments(postId: number): Promise<Comment[]>;
    findOne(id: number): Promise<Comment>;
    update(id: number, updateComment: any): Promise<{
        message: string;
        data: Comment;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
