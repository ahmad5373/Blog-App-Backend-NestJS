import { HttpException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { PostsService } from 'src/post/post.service';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    private readonly postRepository: PostsService,
  ) { }

  async create(comment: any): Promise<Comment> {
    try {
      const post = await this.postRepository.findOne(comment.post);
      if (!post) {
        throw new NotFoundException('Post not found');
      }
      return this.commentRepository.save(comment);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }

  findAll(): Promise<Comment[]> {
    return this.commentRepository.find({ relations: ['post', 'author'] });
  }
  
  findPostAllComments(postId: number): Promise<Comment[]> {
    return this.commentRepository.find({
      where: { post: { id: postId } },
      relations: ['post', 'author'], 
    });
  }

  async findOne(id: number): Promise<Comment> {
    const comments = await this.commentRepository.findOne({ where: { id }, relations: ['post', 'author'] });
    if (!comments) {
      throw new NotFoundException("comment not found")
    }
    return comments;
  }

  async update(id: number, updateComment) {
    const comments = await this.commentRepository.findOne({ where: { id }, relations: ['post', 'author'] });
    if (!comments) {
      throw new NotFoundException("comment not found")
    }
    await this.commentRepository.update(id, updateComment);
    return { message: "Updated Comment successfully.", data: await this.findOne(id) };
  }

  async remove(id: number) {
    const comments = await this.commentRepository.findOne({ where: { id }, relations: ['post', 'author'] });
    if (!comments) {
      throw new NotFoundException("comment not found")
    }
    await this.commentRepository.delete(id);
    return { message: 'comment deleted successfully' };
  }

}
