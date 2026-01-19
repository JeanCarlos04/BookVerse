export interface UsersType {
  id: number;
  username: string;
  password: string;
  email: string;
  avatar_url: string;
  role: "USER" | "ADMIN";
}
