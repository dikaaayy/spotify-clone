import { HomeIcon, SearchIcon, BookmarkAltIcon, PlusCircleIcon, HeartIcon, RssIcon } from "@heroicons/react/outline";
import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import useSpotify from "../hooks/useSpotify";

export default function Sidebar() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items);
      });
    }
  }, [session, spotifyApi]);

  function truncate(str, len) {
    return str?.length > len ? str.substr(0, len - 1) + "..." : str;
  }

  return (
    <div>
      <div className="text-[#626262] text-sm md:text-base pt-5 pl-5 pr-4 border-r-[1px] border-[#626262] overflow-y-scroll h-screen scrollbar-hide md:w-[21vw] xl:w-[13vw]">
        <div className="space-y-2">
          <button
            className="flex items-center gap-x-2 hover:text-white transition duration-100"
            onClick={() => {
              signOut();
            }}
          >
            <p className="font-bold">Logout</p>
          </button>
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
          <hr className="border-[#626262] border-t-[1px] mt-3" />
        </div>
        <div className="mt-3 space-y-2">
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
        <div className="mt-2 flex flex-col gap-y-2">
          {playlists.map((playlist) => {
            return (
              <>
                <button className="flex items-center hover:text-white transition duration-100">
                  <p className="font-semibold">{truncate(playlist?.name, 23)}</p>
                </button>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}
