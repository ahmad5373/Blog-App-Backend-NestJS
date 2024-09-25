import { User } from '../../user/entities/user.entity';
import { Comment } from 'src/comment/entities/comment.entity';
export declare class Post {
    id: number;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    user: User;
    comments: Comment[];
}
