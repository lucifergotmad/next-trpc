import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      userId: string;
      fullname: string;
      username: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    username: string;
    fullname: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId: string;
    fullname: string;
    username: string;
  }
}
