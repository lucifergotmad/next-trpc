import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";

import { nextAuthOptions } from "./auth";

export const requireAuth =
  (fun: GetServerSideProps) => async (ctx: GetServerSidePropsContext) => {
    const session = await getServerSession(ctx.req, ctx.res, nextAuthOptions);

    if (!session) {
      return {
        redirect: {
          destination: "/auth/sign-in",
          permanent: false,
        },
      };
    }

    return await fun(ctx);
  };
