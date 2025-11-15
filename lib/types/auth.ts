import { Wallet } from "./payment";

export interface User {
  id: string;
  email: string;
  name: string;
  wallets: Wallet[];
}

export interface SignInCredentials {
  email: string;
  password: string;
}

export interface SignInResponse {
  success: boolean;
  user: User;
}

