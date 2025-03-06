import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../../user/user.entity';
import { CommentEntity } from './comment.entity';

@Entity('likes')
export class LikeEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @ManyToOne(() => UserEntity, user => user.likes, { onDelete: 'CASCADE' })
  user: UserEntity;

  @ManyToOne(() => CommentEntity, comment => comment.likes, { onDelete: 'CASCADE' })
  comment: CommentEntity;
}