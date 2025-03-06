import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { PostEntity } from '../post/post.entity';
import { CommentEntity } from '../comments/entity/comment.entity';
import { LikeEntity } from '../comments/entity/likes.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @Column({ type: 'varchar', select: false  })
  password: string;

  @OneToMany(() => PostEntity, post => post.user)
  posts: PostEntity[];

  @OneToMany(() => CommentEntity, comment => comment.user)
  comments: CommentEntity[];

  @OneToMany(() => LikeEntity, like => like.user)
  likes: LikeEntity[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
}