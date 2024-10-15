import type { Token } from "./Token";

export interface User {
  token: Token;
  name: string;
  typeUser: string;
}
