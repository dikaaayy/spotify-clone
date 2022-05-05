import { HomeIcon, SearchIcon, BookmarkAltIcon, PlusCircleIcon, HeartIcon, RssIcon } from "@heroicons/react/outline";
import { useSession, signOut } from "next-auth/react";

export default function Sidebar() {
  const { data: session, status } = useSession();
  return (
    <div>
      <div className="text-[#626262] text-sm md:text-base pt-5 pl-5 pr-4 border-r-[1px] border-[#626262] overflow-y-scroll h-screen scrollbar-hide md:w-[21vw] xl:w-[13vw]">
        <div className="space-y-2">
          <button
            className="flex items-center gap-x-2 hover:text-white transition"
            onClick={() => {
              signOut();
            }}
          >
            <p className="font-semibold">Logout</p>
          </button>
          <button className="flex items-center gap-x-2 hover:text-white transition">
            <HomeIcon className="h-5 lg:h-6" />
            <p className="font-semibold">Home</p>
          </button>
          <button className="flex items-center gap-x-2 hover:text-white transition">
            <SearchIcon className="h-5 lg:h-6" />
            <p className="font-semibold">Search</p>
          </button>
          <button className="flex items-center gap-x-2 hover:text-white transition">
            <BookmarkAltIcon className="h-5 lg:h-6" />
            <p className="font-semibold">Your Library</p>
          </button>
          <hr className="border-[#626262] border-t-[1px] mt-3" />
        </div>
        <div className="mt-3 space-y-2">
          <button className="flex items-center gap-x-2 hover:text-white transition">
            <PlusCircleIcon className="h-5 lg:h-6" />
            <p className="font-semibold">New Playlist</p>
          </button>
          <button className="flex items-center gap-x-2 hover:text-white transition">
            <HeartIcon className="h-5 lg:h-6" />
            <p className="font-semibold">Liked Song</p>
          </button>
          <button className="flex items-center gap-x-2 hover:text-white transition">
            <RssIcon className="h-5 lg:h-6" />
            <p className="font-semibold">Explore</p>
          </button>
          <hr className="border-[#626262] border-t-[1px] my-3" />
        </div>
        <div className="mt-2">
          <p className="font-semibold">P1</p>
          <p className="font-semibold">P1</p>
          <p className="font-semibold">P1</p>
        </div>
      </div>
    </div>
  );
}
