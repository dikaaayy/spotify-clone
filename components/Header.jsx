import Head from "next/head";
export default function Header() {
  return (
    <Head>
      <title>Spotify Web Player</title>
      <link rel="icon" href="https://www.freepnglogos.com/uploads/spotify-logo-png/spotify-icon-marilyn-scott-0.png" type="image/x-icon" />

      <link rel="canonical" href="https://spotify-player.andikay.me/" />

      <meta name="description" content="Spotify Web Player porfolio website made by Dika for Personal Purpose" />
      <meta property="og:description" content="Spotify Web Player porfolio website made by Dika for Personal Purpose" />

      <meta property="og:url" content="https://spotify-player.andikay.me/" />
      <meta property="og:site_name" content="andikay" />

      <meta property="og:image" content="https://www.freepnglogos.com/uploads/spotify-logo-png/spotify-icon-marilyn-scott-0.png" />

      <meta property="og:image:width" content="500" />
      <meta property="og:image:height" content="500" />
      <meta property="og:image:type" content="image/ico" />
    </Head>
  );
}
