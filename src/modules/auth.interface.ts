
export interface ParsedToken {
  readonly id: number;
  readonly password: string;
}

export interface AuthRequest {
  token: ParsedToken
}