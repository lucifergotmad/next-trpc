import * as z from "zod";

export const loginSchema = z.object({
  username: z.string().max(16),
  password: z.string().min(4).max(12),
});

export const signUpSchema = loginSchema.extend({
  fullname: z.string(),
});

export type ILogin = z.infer<typeof loginSchema>;
export type ISignUp = z.infer<typeof signUpSchema>;
