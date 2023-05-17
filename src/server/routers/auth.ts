import { signUpSchema } from "~/common/validation/auth.dto";
import { publicProcedure, router } from "../trpc";
import { TRPCError } from "@trpc/server";
import { genSalt, hash } from "bcrypt";

export const authRouter = router({
  signup: publicProcedure
    .input(signUpSchema)
    .mutation(async ({ input, ctx }) => {
      const { username, fullname, password } = input;

      const exists = await ctx.prisma.user.findFirst({
        where: { username },
      });

      if (exists) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "User already exists",
        });
      }

      const salt = await genSalt(10);
      const hashedPassword = await hash(password, salt);

      const result = await ctx.prisma.user.create({
        data: { username, fullname, password: hashedPassword },
      });

      return {
        status: 201,
        message: "Account created successfully",
        data: result.username,
      };
    }),
});

export type IAuthRouter = typeof authRouter;
