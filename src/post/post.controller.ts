import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PostsService } from './post.service';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) { }

  @Get()
  async getAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: number) {
    return this.postsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() postData, @Request() req) {
    const user = req.user.id;
    return this.postsService.create({ ...postData, user });
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: number, @Body() postData) {
    return this.postsService.update(id, postData);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.postsService.delete(id);
  }
}
