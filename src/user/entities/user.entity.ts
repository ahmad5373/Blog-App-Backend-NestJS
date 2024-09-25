import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert,  OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Post } from 'src/post/entities/post.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { IsEmail, Length } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;
  
  @Column({ unique: true })
  @IsEmail({}, { message: 'Invalid email address' }) 
  email: string;

  @Column()
  @Length(8, 20, { message: 'Password must be between 8 and 20 characters' }) 
  password: string;


  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;


  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @OneToMany(()=> Post, post => post.user)
  posts: Post[];
  
  @OneToMany(()=> Comment, comment => comment.author)
  comments: Comment[];
}
