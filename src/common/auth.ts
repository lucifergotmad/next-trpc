import Credentials from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { compare } from "bcrypt";

import { loginSchema } from "./validation/auth.dto";
import { prisma } from "~/server/prisma";
import { env } from "~/server/env";

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const { username, password } = await loginSchema.parseAsync(
            credentials
          );

          const result = await prisma.user.findFirst({
            where: { username },
          });

          if (!result) return null;

          const isValidPassword = await compare(password, result.password);

          if (!isValidPassword) return null;

          return result;
        } catch {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.userId = user.id;
        token.fullname = user.fullname;
        token.username = user.username;
      }

      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user.userId = token.userId;
        session.user.fullname = token.fullname;
        session.user.username = token.username;
      }
      return session;
    },
  },
  jwt: {
    maxAge: 15 * 24 * 30 * 60, // 15 days
  },
  pages: {
    signIn: "/auth/sign-in",
    newUser: "/auth/sign-up",
  },
  secret: env.JWT_SECRET_KEY,
};
