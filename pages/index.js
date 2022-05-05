import Head from "next/head";
import Sidebar from "../components/Sidebar";
import Main from "../components/Main";

export default function Home() {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <Head>
        <title>Spotify Clone</title>
        <meta name="description" content="Spotify Clone made by Dika for Personal Purpose" />
        <link rel="icon" href="https://www.freepnglogos.com/uploads/spotify-logo-png/spotify-icon-marilyn-scott-0.png" type="image/x-icon" />
      </Head>

      <main className="flex">
        <Sidebar />
        <Main />
      </main>
      <div></div>
    </div>
  );
}
