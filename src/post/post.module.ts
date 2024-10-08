import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity'; 
import { PostsService } from './post.service';
import { PostsController } from './post.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { CommentModule } from 'src/comment/comment.module';

@Module({
  imports: [
  TypeOrmModule.forFeature([Post]), 
  forwardRef(() => CommentModule),
  JwtModule,
  UserModule
], 
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService ],
})
export class PostModule {}
