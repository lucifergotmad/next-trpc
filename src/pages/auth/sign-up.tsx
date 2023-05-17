import Link from "next/link";
import Head from "next/head";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";

import { ISignUp, signUpSchema } from "~/common/validation/auth.dto";
import { trpc } from "~/utils/trpc";

const SignUp: NextPage = () => {
  const router = useRouter();

  const { handleSubmit, control, reset } = useForm<ISignUp>({
    defaultValues: {
      username: "",
      fullname: "",
      password: "",
    },
    resolver: zodResolver(signUpSchema),
  });

  const { mutateAsync } = trpc.signup.useMutation();

  const onSubmit = useCallback(
    async (data: ISignUp) => {
      try {
        const result = await mutateAsync(data);
        if (result.status === 201) {
          reset();
          router.push("/auth/sign-in");
        }
      } catch (error) {
        console.error(error);
      }
    },
    [mutateAsync, router, reset]
  );

  return (
    <div>
      <Head>
        <title>Next App - Register</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>Create an account!</h2>
          <Controller
            name="fullname"
            control={control}
            render={({ field }) => (
              <input type="text" placeholder="Type your fullname" {...field} />
            )}
          />
          <br />
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <input type="text" placeholder="Type your username" {...field} />
            )}
          />
          <br />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <input
                type="password"
                placeholder="Type your password"
                {...field}
              />
            )}
          />
          <br />
          <br />

          <button type="submit">Sign Up</button>
          <br />
          <Link href="/auth/sign-in">Go to login</Link>
        </form>
      </main>
    </div>
  );
};

export default SignUp;