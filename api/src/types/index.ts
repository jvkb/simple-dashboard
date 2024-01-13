import { Request } from 'express';

export type User = {
  id: string;
  email: string;
  password: string;
  name: string;
};

export type ExtendedRequest = {
  isLoggedIn: boolean;
  user: User;
};

export type LoginDTO = {
  email: string;
  password: string;
};

