import { useRecoilState } from "recoil";
import useSpotify from "../hooks/useSpotify";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import { dateLogic, durationLogic } from "./logic";
import { truncate } from "./logic";
import { Image } from "next/image";

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
    <div className="song-grid group" onDoubleClick={playSong}>
      <div className="flex space-x-5 items-center md:col-span-2">
        <p className="basis-6">{order + 1}</p>
        <Image loading="lazy" className="w-10 h-10" src={item?.track?.album?.images[0]?.url} alt="song-artwork" />
        <div className="space-y-0">
          <p className="text-white">{truncate(item?.track?.name, 50)}</p>
          <p className="song-desc">{item?.track?.artists[0]?.name}</p>
        </div>
      </div>
      <div className="hidden sm:block col">
        <p className="text-sm hover:underline cursor-pointer group-hover:text-white">{truncate(item?.track?.album?.name, 40)}</p>
      </div>
      <div className="hidden md:block ml-10">
        <p className="text-sm">{dateLogic(item?.added_at)}</p>
      </div>
      <div className="justify-self-end mr-5 hidden md:block">
        <p className="text-sm">{durationLogic(item?.track?.duration_ms)}</p>
      </div>
    </div>
  );
}
