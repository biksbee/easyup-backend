export type CreateUserType = {
  name: string;
  password: string;
}

export type CheckUserType = {
  id: number;
  password: string;
}

export type GenerateTokenPayloadType = {
  id: number;
  password: string;
};