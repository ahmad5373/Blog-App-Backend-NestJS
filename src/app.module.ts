import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { DatabaseModule } from './databaseModule';

@Module({
  imports: [
    AuthModule,
    UserModule,
    PostModule,
    CommentModule,
    DatabaseModule
  ],
})
export class AppModule {}
