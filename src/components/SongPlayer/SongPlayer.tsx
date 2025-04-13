"use client";

import { useState, useRef, useEffect } from "react";
import { css } from "../../../styled-system/css";
import { flex } from "../../../styled-system/patterns";
import PlayButton from "@/assets/playbutton.svg";
import BackButton from "@/assets/backbutton.svg";
import ForwardButton from "@/assets/forwardbutton.svg";

export default function SongPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current?.pause();
      } else {
        audioRef.current?.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleBackward = () => {};

  const handleForward = () => {};

  return (
    <div
      className={css({
        maxW: "500px",
        p: "4",
      })}
    >
      <div
        className={flex({
          justify: "center",
          align: "center",
          gap: "10",
          mt: "6",
          w: "370px",
        })}
      >
        <BackButton onClick={handleBackward} direction="backward" />
        <PlayButton isPlaying={isPlaying} onClick={togglePlay} />
        <ForwardButton onClick={handleForward} direction="forward" />
      </div>
    </div>
  );
}
