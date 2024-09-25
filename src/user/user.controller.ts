import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('userCreate')
  create(@Body() userData: 'UserData') {
    return this.userService.create(userData);
  }

  @Get()
  findAll() {
    console.log("here request hit");
    return this.userService.findAll();
  }
}
