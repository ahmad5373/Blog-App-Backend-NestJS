import { Post } from '../../post/entities/post.entity';
import { User } from 'src/user/entities/user.entity';
export declare class Comment {
    id: number;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    post: Post;
    author: User;
}
