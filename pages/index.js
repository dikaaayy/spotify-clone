import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Main from "../components/Main";
import { getSession } from "next-auth/react";
import Player from "../components/Player";

export default function Home() {
  return (
    <div className="bg-black h-screen overflow-hidden cursor-default select-none font-spotifyCircular">
      <Header />
      <main className="flex">
        <Sidebar />
        <Main />
      </main>
      <div className="grid grid-cols-3 px-5 w-full border-t-[1px] border-[#292929] items-center justify-between text-white h-[10vh] sticky bottom-0 bg-[#181818]">
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
