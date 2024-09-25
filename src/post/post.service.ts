import { HttpException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    private userRepository: UserService,
  ) { }

  async create(postData: any) {
    try {
      const user = await this.userRepository.findOne(postData.id);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return this.postRepository.save(postData);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
        throw new InternalServerErrorException('An unexpected error occurred');
    }
  }

  async findAll() {
    return  await this.postRepository.find({
      relations: ['user' ,'comments'],
    });
  }

  async findOne(id: number) {
    const post = await this.postRepository.findOne({ where: { id }, relations: ['user' , 'comments'] });
    if (!post) {
      throw new NotFoundException("Post not found.")
    }
    return post
  }

  async update(id: number, postData) {
    try {
      const post = await this.postRepository.findOne({ where: { id: id } });
      if (!post) {
        throw new NotFoundException('Post found');
      }
      await this.postRepository.update(id, postData);
      return { message: 'Post updated successfully' };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
        throw new InternalServerErrorException('An unexpected error occurred');
    }
  }

  async delete(id: number) {
    const post = await this.postRepository.findOne({ where: { id: id } });
    if (!post) {
      throw new NotFoundException('Post found');
    }
    await this.postRepository.delete(id);
    return { message: 'Post deleted successfully' };
  }
}
