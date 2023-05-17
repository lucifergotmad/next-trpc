import { NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import { requireAuth } from "~/common/require-auth";

export const getServerSideProps = requireAuth(async (ctx) => {
  return { props: {} };
});

const Home: NextPage = () => {
  const { data } = useSession();
  return (
    <div>
      <h1>You are logged in!</h1>
      <p>
        You are allowed to visit this page because you have a session, otherwise
        you would be redirected to the login page.
      </p>
      <pre>
        <code>{JSON.stringify(data, null, 2)}</code>
      </pre>
      <button onClick={() => signOut({ callbackUrl: "/auth/sign-in" })}>
        Log out
      </button>
    </div>
  );
};

export default Home;
