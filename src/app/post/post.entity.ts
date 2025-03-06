import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { CommentEntity } from '../comments/entity/comment.entity';

@Entity('post')
export class PostEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'int', nullable: true })
  userId: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => UserEntity, user => user.posts, { onDelete: 'CASCADE' })
  user: UserEntity;

  @OneToMany(() => CommentEntity, comment => comment.post)
  comments: CommentEntity[];
}