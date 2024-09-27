import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { Post } from './post/entities/post.entity';
import { Comment } from './comment/entities/comment.entity';
import * as dotenv from 'dotenv';
dotenv.config();
const LOCAL_DATABASE_URL = `postgresql://${process.env.PGUSER}:${process.env.POSTGRES_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.PGDATABASE}?sslmode=disable`
@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            url: process.env.NODE_ENV === 'production' ? process.env.DATABASE_URL : LOCAL_DATABASE_URL ,
            entities: [User, Post, Comment],
            synchronize: true,
            ssl: {
                rejectUnauthorized: false,
            },
        }),
    ],
})
export class DatabaseModule { }
