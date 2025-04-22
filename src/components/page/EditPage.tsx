"use client";

import { useCallback, useRef, useState } from "react";
import { css } from "../../../styled-system/css";
import { LuPlay, LuPause } from "react-icons/lu";
import { useAudioStore } from "@/stores/audioStores";
import { formatDuration } from "@/utils/formatTime";
import Button from "../Buttons/Button";
import Header from "../Header";
import Text from "../Text";
import AudioPlayer from "@/components/Audio/AudioPlayer";

export default function EditPage({ basePath }: { basePath: string }) {
  const { file, audioUrl, duration } = useAudioStore();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [selection, setSelection] = useState<[number, number]>([0, 10]);

  if (!file || !audioUrl) {
    return (
      <div className={css({ padding: "2", color: "gray.600" })}>
        No audio file uploaded
      </div>
    );
  }

  const handlePlayToggle = () => {
    if (!audioRef.current) return;
    if (audioRef.current.paused) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };
  const onSelectionChange = useCallback((start: number, end: number) => {
    setSelection([start, end]);
  }, []);
  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        height: "100%",
        padding: "30px 16px",
        gap: "16px",
        backgroundColor: "#fff",
      })}
    >
      <Header nextStepUrl={`/post/${basePath}?step=title`} />

      <div
        className={css({
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: "100%",
          padding: "0 16px",
          marginTop: "30px",
        })}
      >
        <Text as="h1" className={css({ marginBottom: "20px" })}>
          Edit your mp3 file
        </Text>

        {/* 🎧 오디오 실제 재생 */}
        <audio
          ref={audioRef}
          src={audioUrl}
          preload="metadata"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        />

        {/* 🎵 플레이어 UI */}
        <div
          className={css({
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "0.5rem",
            padding: "0px 8px",
            fontWeight: "500",
            backgroundColor: "#3b82f6",
            color: "white",
            marginBottom: "10px",
          })}
        >
          <Button
            variant="icon"
            onClick={handlePlayToggle}
            className={css({ justifyContent: "start" })}
          >
            {playing ? <LuPause /> : <LuPlay />}
          </Button>
          <span>{file.name}</span>
          <span>{formatDuration(duration)}</span>
        </div>

        {/* 🔷 구간 선택 UI */}
        <AudioPlayer
          duration={duration}
          currentTime={currentTime}
          onSelectionChange={onSelectionChange}
        />
      </div>
    </div>
  );
}
