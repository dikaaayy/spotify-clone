import { useRecoilState } from "recoil";
import useSpotify from "../hooks/useSpotify";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import { dateLogic, durationLogic } from "./logic";

export default function Song({ order, item }) {
  const spotifyApi = useSpotify();
  const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  const playSong = () => {
    setCurrentTrackId(item.track.id);
    setIsPlaying(true);
    spotifyApi.play({
      uris: [item.track.uri],
    });
  };

  return (
    <div className="grid grid-cols-2 group md:grid-cols-5 items-center hover:bg-white hover:bg-opacity-5 rounded-md p-2 pl-4 text-[#B3B3B3]" onDoubleClick={playSong}>
      <div className="flex space-x-5 items-center md:col-span-2">
        <p className="basis-6">{order + 1}</p>
        <img loading="lazy" className="w-10 h-10" src={item?.track?.album?.images[0]?.url} alt="song-artwork" />
        <div className="space-y-0">
          <p className="text-white truncate">{item?.track?.name}</p>
          <p className="text-sm group-hover:text-white cursor-pointer hover:underline">{item?.track?.artists[0]?.name}</p>
        </div>
      </div>
      <div className="hidden sm:block">
        <p className="text-sm hover:underline cursor-pointer group-hover:text-white">{item?.track?.album?.name}</p>
      </div>
      <div className="hidden md:block ml-10">
        <p className="text-sm">{dateLogic(item?.added_at)}</p>
      </div>
      <div className="justify-self-end mr-5">
        <p className="text-sm">{durationLogic(item?.track?.duration_ms)}</p>
      </div>
    </div>
  );
}
