// src/components/SongPlayer/SongPlayer.tsx
"use client";

import { css } from "@/../../styled-system/css";
import { flex } from "@/../../styled-system/patterns";
import PlayButton from "@/assets/playbutton.svg";
import BackButton from "@/assets/backbutton.svg";
import ForwardButton from "@/assets/forwardbutton.svg";

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
        <PlayButton isPlaying={isPlaying} onClick={onTogglePlay} />
        <ForwardButton onClick={onForward} direction="forward" />
      </div>
    </div>
  );
}
