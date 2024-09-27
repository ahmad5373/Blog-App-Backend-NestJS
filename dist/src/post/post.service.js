"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const post_entity_1 = require("./entities/post.entity");
const user_service_1 = require("../user/user.service");
const comment_service_1 = require("../comment/comment.service");
let PostsService = class PostsService {
    constructor(postRepository, commentService, userService) {
        this.postRepository = postRepository;
        this.commentService = commentService;
        this.userService = userService;
    }
    async create(postData) {
        try {
            const user = await this.userService.findOne(postData.id);
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            return this.postRepository.save(postData);
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('An unexpected error occurred');
        }
    }
    async findAll() {
        return await this.postRepository.find({
            relations: ['user', 'comments'],
        });
    }
    async findOne(id) {
        const post = await this.postRepository.findOne({ where: { id }, relations: ['user', 'comments'] });
        if (!post) {
            throw new common_1.NotFoundException("Post not found.");
        }
        return post;
    }
    async update(id, postData) {
        try {
            const post = await this.postRepository.findOne({ where: { id: id } });
            if (!post) {
                throw new common_1.NotFoundException('Post found');
            }
            await this.postRepository.update(id, postData);
            return { message: 'Post updated successfully' };
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('An unexpected error occurred');
        }
    }
    async delete(id) {
        const post = await this.postRepository.findOne({ where: { id: id }, relations: ['comments'] });
        if (!post) {
            throw new common_1.NotFoundException('Post found');
        }
        if (post.comments.length > 0) {
            await this.commentService.deleteAll(id);
        }
        await this.postRepository.delete(id);
        return { message: 'Post deleted successfully' };
    }
};
exports.PostsService = PostsService;
exports.PostsService = PostsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(post_entity_1.Post)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => comment_service_1.CommentService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        comment_service_1.CommentService,
        user_service_1.UserService])
], PostsService);
//# sourceMappingURL=post.service.js.map