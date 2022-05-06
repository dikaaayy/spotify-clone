import Head from "next/head";
import Sidebar from "../components/Sidebar";
import Main from "../components/Main";
import { getSession } from "next-auth/react";
import Player from "../components/Player";

export default function Home() {
  return (
    <div className="bg-black h-screen overflow-hidden cursor-default select-none">
      <Head>
        <title>Spotify Clone</title>
        <meta name="description" content="Spotify Clone made by Dika for Personal Purpose" />
        <link rel="icon" href="https://www.freepnglogos.com/uploads/spotify-logo-png/spotify-icon-marilyn-scott-0.png" type="image/x-icon" />
      </Head>

      <main className="flex">
        <Sidebar />
        <Main />
      </main>
      <div className="grid grid-cols-3 px-5 border-t-[1px] border-[#292929] items-center justify-between text-white h-[10vh] sticky bottom-0 w-screen bg-[#181818]">
        <Player />
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
