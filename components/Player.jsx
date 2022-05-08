import { VolumeUpIcon as VolumeDownIcon } from "@heroicons/react/outline";
import { VolumeUpIcon, VolumeOffIcon } from "@heroicons/react/outline";
import { RewindIcon, PauseIcon, PlayIcon, FastForwardIcon, ReplyIcon, SwitchHorizontalIcon, RefreshIcon } from "@heroicons/react/solid";
import { debounce } from "lodash";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import { isShuffleState, repeatState } from "../atoms/buttonAtom";
import useSongInfo from "../hooks/useSongInfo";
import useSpotify from "../hooks/useSpotify";
import { repeatColor, durationLogic } from "./logic";
import { Image } from "next/image";

export default function Player() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useState(40);
  const [isShuffle, setIsShuffle] = useRecoilState(isShuffleState);
  const [repeat, setRepeat] = useRecoilState(repeatState);

  const songInfo = useSongInfo(currentTrackId);

  const shuffleHandler = () => {
    spotifyApi.getMyCurrentPlaybackState().then((data) => {
      if (data?.body.shuffle_state) {
        spotifyApi.setShuffle(false);
        setIsShuffle(false);
      } else {
        spotifyApi.setShuffle(true);
        setIsShuffle(true);
      }
    });
  };

  const repeatHandler = () => {
    spotifyApi.getMyCurrentPlaybackState().then((data) => {
      if (data?.body.repeat_state === "off") {
        spotifyApi.setRepeat("context");
        setRepeat("context");
      }
      if (data?.body.repeat_state === "context") {
        spotifyApi.setRepeat("track");
        setRepeat("track");
      }
      if (data?.body.repeat_state === "track") {
        spotifyApi.setRepeat("off");
        setRepeat("off");
      }
    });
  };

  const playPauseHandler = () => {
    spotifyApi.getMyCurrentPlaybackState().then((data) => {
      if (data?.body && data?.body.is_playing) {
        // console.log(data?.body);
        spotifyApi.pause();
        setIsPlaying(false);
      } else {
        spotifyApi.play();
        setIsPlaying(true);
      }
    });
  };

  const volumeHandler = (e) => {
    setVolume(Number(e.target.value));
  };

  // const skipNextHandler = () => {
  //   spotifyApi.skipToNext().then(
  //     (data) => {
  //       console.log(data);
  //       songInfo;
  //     },
  //     function (err) {
  //       //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
  //       console.log("Something went wrong!", err);
  //     }
  //   );
  // };

  const fetchCurrentSong = () => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then((data) => {
        setCurrentTrackId(data.body?.item?.id);
        spotifyApi.getMyCurrentPlaybackState().then((data) => {
          setIsPlaying(data.body?.is_playing);
          setIsShuffle(data.body?.shuffle_state);
          setRepeat(data.body?.repeat_state);
        });
      });
    }
  };

  const debouncedAdjustVolume = useCallback(
    debounce((volume) => {
      spotifyApi.setVolume(volume).catch((e) => {
        console.error(e);
      });
    }, 300),
    []
  );

  useEffect(() => {
    spotifyApi.getMyCurrentPlayingTrack().then(
      function (data) {
        // console.log(data.body.item);
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );
    fetchCurrentSong();
  }, [currentTrackIdState, spotifyApi, session, isPlaying]);

  useEffect(() => {
    if (volume > 0 && volume < 100) {
      debouncedAdjustVolume(volume);
    }
  }, [volume]);

  useEffect(() => {
    if (isPlaying) {
      document.title = songInfo?.name + " • " + songInfo?.artists[0].name;
    } else {
      document.title = "Spotify Clone";
    }
  }, [isPlaying, currentTrackId, spotifyApi, session]);

  const handleUserKeyPress = useCallback((e) => {
    const { key, keyCode } = e;
    e.preventDefault();
    e.stopImmediatePropagation();
    spotifyApi.getMyCurrentPlaybackState().then((data) => {
      if (keyCode === 32) {
        if (data?.body && data?.body.is_playing) {
          spotifyApi.pause();
          setIsPlaying(false);
        } else {
          spotifyApi.play();
          setIsPlaying(true);
        }
      }
    });
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress);
    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
    };
  }, [isPlaying, handleUserKeyPress]);

  // console.log(songInfo);

  return (
    <>
      <div className="flex gap-x-3 items-center">
        <Image className="w-14 h-14" src={songInfo?.album.images?.[0].url} alt="" />
        <div>
          <p className="text-sm">{songInfo?.name}</p>
          <p className="text-xs text-[#B3B3B3] hover:underline cursor-pointer hover:text-white">{songInfo?.artists[0].name}</p>
        </div>
      </div>
      <div>
        <div className="flex items-center justify-center gap-x-5 w-full justify-self-center">
          <SwitchHorizontalIcon className={`button ${isShuffle ? "text-green-500" : "text-white"}`} onClick={shuffleHandler} />
          <RewindIcon className="button" />
          {isPlaying ? <PauseIcon onClick={playPauseHandler} className="button w-10 h-10" /> : <PlayIcon onClick={playPauseHandler} className="button w-10 h-10" />}
          <FastForwardIcon className="button" />
          <RefreshIcon className={`button ${repeatColor(repeat)}`} onClick={repeatHandler} />
        </div>
        <div className="flex items-center gap-x-3">
          <p className="text-xs">1:00</p>
          <input className="h-1 w-full" type="range" min={0} max={100} value={50} disabled />
          <p className="text-xs">{durationLogic(songInfo?.duration_ms)}</p>
        </div>
      </div>
      <div className="flex gap-x-2 justify-self-end items-center">
        {volume > 0 ? (
          <VolumeDownIcon
            onClick={() => {
              volume > 0 && setVolume(volume - 5);
            }}
            className="button h-5 w-5"
          />
        ) : (
          <VolumeOffIcon className="button h-5 w-5" />
        )}
        <input className="w-16 h-1 md:w-28" onChange={volumeHandler} type="range" min={0} max={100} value={volume} name="" id="" />
        <VolumeUpIcon
          onClick={() => {
            volume < 100 && setVolume(volume + 5);
          }}
          className="button"
        />
      </div>
    </>
  );
}
