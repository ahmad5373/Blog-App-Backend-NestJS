import { Controller, Post, Get, Body, Param, Delete, Put, UseGuards, Request } from '@nestjs/common';
import { CommentService } from './comment.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) { }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  create(@Body() comment, @Request() req) {
    const commentData = { post: comment.postId, content: comment.content }
    const author = req.user.id;
    return this.commentService.create({ ...commentData, author });
  }

  @Get()
  findAll() {
    return this.commentService.findAll();
  }

  @Get('post/:postId')
  findAllCommentsByPostId(@Param('postId') postId: number) {
    return this.commentService.findPostAllComments(postId);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.commentService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: number, @Body() comment, @Request() req) {
    const commentData = { post: comment.postId, content: comment.content }
    return this.commentService.update(id, commentData);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.commentService.remove(id);
  }
}
