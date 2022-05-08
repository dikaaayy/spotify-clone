import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Main from "../components/Main";
import { getSession } from "next-auth/react";
import Player from "../components/Player";

export default function Home() {
  return (
    <div className="whole-container">
      <Header />
      <main className="flex">
        <Sidebar />
        <Main />
      </main>
      <div className="player-container">
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
