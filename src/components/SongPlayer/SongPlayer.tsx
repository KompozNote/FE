// src/components/SongPlayer/SongPlayer.tsx
"use client";

import { css } from "@/../../styled-system/css";
import { flex } from "@/../../styled-system/patterns";
import BackButton from "@/assets/backbutton.svg";
import ForwardButton from "@/assets/forwardbutton.svg";
import { HiPlay, HiPause } from "react-icons/hi";

interface SongPlayerProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  onForward: () => void;
  onBackward: () => void;
}

export default function SongPlayer({
  isPlaying,
  onTogglePlay,
  onForward,
  onBackward,
}: SongPlayerProps) {
  return (
    <div className={css({ maxW: "400px", p: "2" })}>
      <div
        className={flex({
          justify: "center",
          align: "center",
          gap: "10",
          w: "370px",
        })}
      >
        <BackButton onClick={onBackward} direction="backward" />
        <button onClick={onTogglePlay}>
          {isPlaying ? (
            <HiPause
              className={css({
                width: "70px",
                height: "70px",
                color: "#d9d9d9",
              })}
            />
          ) : (
            <HiPlay
              className={css({
                width: "70px",
                height: "70px",
                color: "#d9d9d9",
              })}
            />
          )}
        </button>
        <ForwardButton onClick={onForward} direction="forward" />
      </div>
    </div>
  );
}
