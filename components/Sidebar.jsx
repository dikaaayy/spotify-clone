import { HomeIcon, SearchIcon, BookmarkAltIcon, PlusCircleIcon, HeartIcon, RssIcon } from "@heroicons/react/outline";
import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { playlistIdState } from "../atoms/playlistAtom";
import useSpotify from "../hooks/useSpotify";
import { truncate } from "./logic";

export default function Sidebar() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState([]);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items);
      });
    }
  }, [session, spotifyApi]);

  return (
    <div>
      <div className="text-[#626262] text-xs lg:text-sm py-5 pl-5 pr-4 overflow-y-scroll h-[90vh] scrollbar-hide hidden md:block md:w-[21vw] xl:w-[13vw]">
        <div className="space-y-3">
          <button className="flex items-center gap-x-4 hover:text-white transition duration-100">
            <HomeIcon className="h-5 lg:h-6" />
            <p className="font-bold">Home</p>
          </button>
          <button className="flex items-center gap-x-4 hover:text-white transition duration-100">
            <SearchIcon className="h-5 lg:h-6" />
            <p className="font-bold">Search</p>
          </button>
          <button className="flex items-center gap-x-4 hover:text-white transition duration-100">
            <BookmarkAltIcon className="h-5 lg:h-6" />
            <p className="font-bold">Your Library</p>
          </button>
          <hr className="border-[#626262] border-t-[1px] mt-3 invisible" />
        </div>
        <div className="mt-6 space-y-3">
          <button className="flex items-center gap-x-4 hover:text-white transition duration-100">
            <PlusCircleIcon className="h-5 lg:h-6" />
            <p className="font-bold">New Playlist</p>
          </button>
          <button className="flex items-center gap-x-4 hover:text-white transition duration-100">
            <HeartIcon className="h-5 lg:h-6" />
            <p className="font-bold">Liked Song</p>
          </button>
          <button className="flex items-center gap-x-4 hover:text-white transition duration-100">
            <RssIcon className="h-5 lg:h-6" />
            <p className="font-bold">Explore</p>
          </button>
          <hr className="border-[#626262] border-t-[1px] my-3" />
        </div>
        <div className="mt-2 flex flex-col space-y-3">
          {playlists.map((playlist) => {
            return (
              <div key={playlist.id}>
                <p
                  className="font-semibold hover:text-white transition duration-100 cursor-pointer"
                  onClick={() => {
                    setPlaylistId(playlist.id);
                  }}
                >
                  {truncate(playlist?.name, 27)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
