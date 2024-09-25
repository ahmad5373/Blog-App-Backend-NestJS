import { PostsService } from './post.service';
export declare class PostsController {
    private postsService;
    constructor(postsService: PostsService);
    getAll(): Promise<import("./entities/post.entity").Post[]>;
    getOne(id: number): Promise<import("./entities/post.entity").Post>;
    create(postData: any, req: any): Promise<any>;
    update(id: number, postData: any): Promise<{
        message: string;
    }>;
    delete(id: number): Promise<{
        message: string;
    }>;
}
