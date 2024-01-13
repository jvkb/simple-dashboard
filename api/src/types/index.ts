import { Request } from 'express';

export type User = {
  id: string;
  email: string;
  password: string;
  name: string;
};

export type LoginDTO = {
  email: string;
  password: string;
};

export interface ExtendedRequest extends Request {
  user: User;
  isLoggedIn: boolean;
}

