import { HomeIcon, SearchIcon, BookmarkAltIcon, PlusCircleIcon, HeartIcon, RssIcon } from "@heroicons/react/outline";

export default function Sidebar() {
  return (
    <div>
      <div className="text-[#626262] pl-5 pt-5 border-r-gray-800">
        <div className="space-y-2">
          <button className="flex items-center gap-x-2 hover:text-white transition">
            <HomeIcon className="h-6" />
            <p className="text-lg font-semibold">Home</p>
          </button>
          <button className="flex items-center gap-x-2 hover:text-white transition">
            <SearchIcon className="h-6" />
            <p className="text-lg font-semibold">Search</p>
          </button>
          <button className="flex items-center gap-x-2 hover:text-white transition">
            <BookmarkAltIcon className="h-6" />
            <p className="text-lg font-semibold">Your Library</p>
          </button>
          <hr className="border-t-[1px] mt-3" />
        </div>
        <div className="mt-3 space-y-2">
          <button className="flex items-center gap-x-2 hover:text-white transition">
            <PlusCircleIcon className="h-6" />
            <p className="text-lg font-semibold">New Playlist</p>
          </button>
          <button className="flex items-center gap-x-2 hover:text-white transition">
            <HeartIcon className="h-6" />
            <p className="text-lg font-semibold">Liked Song</p>
          </button>
          <button className="flex items-center gap-x-2 hover:text-white transition">
            <RssIcon className="h-6" />
            <p className="text-lg font-semibold">Explore</p>
          </button>
          <hr className="border-t-[1px] mt-3" />
        </div>
        <div>
          <p className="text-lg font-semibold">P1</p>
          <p className="text-lg font-semibold">P1</p>
          <p className="text-lg font-semibold">P1</p>
        </div>
      </div>
    </div>
  );
}
