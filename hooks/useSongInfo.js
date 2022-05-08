import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { currentTrackIdState } from "../atoms/songAtom";
import useSpotify from "./useSpotify";

export default function useSongInfo() {
  const spotifyApi = useSpotify();
  const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
  const [songInfo, setSongInfo] = useState(null);

  useEffect(() => {
    const fetchSongInfo = async () => {
      if (currentTrackId) {
        const trackInfo = await fetch(`https://api.spotify.com/v1/tracks/${currentTrackId}`, {
          headers: {
            Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
          },
        });
        const res = await trackInfo.json();
        // console.log(res);
        setSongInfo(res);
      }
    };
    fetchSongInfo();
  }, [currentTrackId, spotifyApi]);

  return songInfo;
}
