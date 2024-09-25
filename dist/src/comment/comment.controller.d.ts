import { CommentService } from './comment.service';
export declare class CommentController {
    private readonly commentService;
    constructor(commentService: CommentService);
    create(comment: any, req: any): Promise<import("./entities/comment.entity").Comment>;
    findAll(): Promise<import("./entities/comment.entity").Comment[]>;
    findAllCommentsByPostId(postId: number): Promise<import("./entities/comment.entity").Comment[]>;
    findOne(id: number): Promise<import("./entities/comment.entity").Comment>;
    update(id: number, comment: any, req: any): Promise<{
        message: string;
        data: import("./entities/comment.entity").Comment;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
