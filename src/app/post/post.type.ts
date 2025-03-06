import { CheckUserType } from '../user/user.type';

export type CreatePostType = {
  title: string;
  description: string;
  user: CheckUserType;
}