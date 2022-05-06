import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { shuffle } from "lodash";
import { useRecoilState, useRecoilValue } from "recoil";
import { playlistIdState, playlistState } from "../atoms/playlistAtom";
import useSpotify from "../hooks/useSpotify";
import Songs from "./Songs";
import Profile from "./Profile";

export default function Main() {
  const spotifyApi = useSpotify();
  const { data: session } = useSession();
  const [bgColor, setBgColor] = useState(null);
  const playlistId = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);

  const colors = ["from-indigo-500", "from-blue-500", "from-green-500", "from-red-500", "from-yellow-500", "from-pink-500", "from-purple-500"];

  useEffect(() => {
    setBgColor(shuffle(colors).pop());
  }, [playlistId]);

  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistId)
      .then((data) => {
        setPlaylist(data.body);
      })
      .catch((e) => {
        console.error(e);
      });
  }, [spotifyApi, playlistId]);

  // console.log(playlist);

  const likeLogic = (n) => {
    if (n === 0) {
      return;
    }
    if (n === 1) {
      return "1 like";
    }
    // const like = n.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    return `${n} likes`;
  };

  return (
    <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide bg-[#121212]">
      <Profile />
      <section className={`flex px-7 items-end space-x-6 bg-gradient-to-b to-[#121212] ${bgColor} h-80`}>
        <img src={playlist?.images?.[0].url} className="h-48 w-48 xl:h-[14.5rem] xl:w-[14.5rem] shadow-2xl" alt="playlist-artwork" />
        <div className="text-white flex flex-col gap-y-2 justify-start">
          <p className="font-bold text-xs -ml-1">PLAYLIST</p>
          <p className="text-4xl -ml-2 mb-3 xl:text-8xl font-bold tracking-[-0.05em]">{playlist?.name}</p>
          <p className="text-[#ffffffb3] -mb-3 tracking-wide">{playlist?.description}</p>
          <div className="flex gap-x-1 items-center pt-2 text-sm">
            <p className="font-semibold">{playlist?.owner.display_name}</p>
            <p>•</p>
            <p>{likeLogic(playlist?.followers.total)}</p>
          </div>
        </div>
      </section>
      <div>
        <Songs />
      </div>
    </div>
  );
}
