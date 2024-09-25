import { Post } from 'src/post/entities/post.entity';
import { Comment } from 'src/comment/entities/comment.entity';
export declare class User {
    id: number;
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    hashPassword(): Promise<void>;
    posts: Post[];
    comments: Comment[];
}
