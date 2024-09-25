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
exports.CommentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const comment_entity_1 = require("./entities/comment.entity");
const post_service_1 = require("../post/post.service");
let CommentService = class CommentService {
    constructor(commentRepository, postRepository) {
        this.commentRepository = commentRepository;
        this.postRepository = postRepository;
    }
    async create(comment) {
        try {
            const post = await this.postRepository.findOne(comment.post);
            if (!post) {
                throw new common_1.NotFoundException('Post not found');
            }
            return this.commentRepository.save(comment);
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('An unexpected error occurred');
        }
    }
    findAll() {
        return this.commentRepository.find({ relations: ['post', 'author'] });
    }
    findPostAllComments(postId) {
        return this.commentRepository.find({
            where: { post: { id: postId } },
            relations: ['post', 'author'],
        });
    }
    async findOne(id) {
        const comments = await this.commentRepository.findOne({ where: { id }, relations: ['post', 'author'] });
        if (!comments) {
            throw new common_1.NotFoundException("comment not found");
        }
        return comments;
    }
    async update(id, updateComment) {
        const comments = await this.commentRepository.findOne({ where: { id }, relations: ['post', 'author'] });
        if (!comments) {
            throw new common_1.NotFoundException("comment not found");
        }
        await this.commentRepository.update(id, updateComment);
        return { message: "Updated Comment successfully.", data: await this.findOne(id) };
    }
    async remove(id) {
        const comments = await this.commentRepository.findOne({ where: { id }, relations: ['post', 'author'] });
        if (!comments) {
            throw new common_1.NotFoundException("comment not found");
        }
        await this.commentRepository.delete(id);
        return { message: 'comment deleted successfully' };
    }
};
exports.CommentService = CommentService;
exports.CommentService = CommentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(comment_entity_1.Comment)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        post_service_1.PostsService])
], CommentService);
//# sourceMappingURL=comment.service.js.map