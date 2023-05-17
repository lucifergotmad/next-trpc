import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { prisma } from "./prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface CreateContextOptions {
  req: NextApiRequest;
  res: NextApiResponse;
  prisma: PrismaClient;
}

export async function createContextInner(_opts: CreateContextOptions) {
  return {
    req: _opts.req,
    res: _opts.res,
    prisma: _opts.prisma,
  };
}

export type Context = trpc.inferAsyncReturnType<typeof createContextInner>;

export async function createContext(
  opts: trpcNext.CreateNextContextOptions
): Promise<Context> {
  return await createContextInner({
    req: opts.req,
    res: opts.res,
    prisma,
  });
}
