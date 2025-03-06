import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../../user/user.entity';
import { PostEntity } from '../../post/post.entity';
import { LikeEntity } from './likes.entity';

@Entity('comments')
export class CommentEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: 255 })
  text: string;

  @Column({ type: 'varchar' })
  author: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => UserEntity, user => user.comments, {onDelete: 'CASCADE' })
  user: UserEntity;

  @ManyToOne(() => PostEntity, post => post.comments, {onDelete: 'CASCADE' })
  post: PostEntity;

  @ManyToOne(() => CommentEntity, comment => comment.replies, { nullable: true, onDelete: 'CASCADE' })
  parent: CommentEntity | null;

  @OneToMany(() => CommentEntity, comment => comment.parent)
  replies: CommentEntity[] | null;

  @OneToMany(() => LikeEntity, (like) => like.comment)
  likes: LikeEntity[] | null;
}