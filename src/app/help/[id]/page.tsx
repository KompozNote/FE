// src/app/help/[id]/page.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import SongProgressBar from "@/components/SongPlayer/SongProgressBar";
import SongPlayer from "@/components/SongPlayer/SongPlayer";
import { songDataList } from "@/mock/songData";
import { css } from "@/../../styled-system/css";
import { stack } from "@/../../styled-system/patterns";
import Button from "@/components/Buttons/Button";
import Link from "next/link";

type Props = {
  params: { id: string };
};

export default function Help({ params }: Props) {
  const song = songDataList.find((item) => item.id === params.id);
  if (!song) return notFound();

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showFullContent, setShowFullContent] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const isOverflow = song.content.length > 100;
  const displayedContent =
    showFullContent || !isOverflow
      ? song.content
      : song.content.slice(0, 100) + "...";

  const handleToggleContent = () => {
    setShowFullContent((prev) => !prev);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime);
      }
    }, 200);
    return () => clearInterval(interval);
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div
      className={stack({
        gap: "4",
        p: "4",
        h: "100vh",
        bg: "white",
        justify: "space-between",
      })}
    >
      {/* 앨범 이미지 */}
      <Image
        src={song.image}
        alt="Album"
        width={512}
        height={512}
        className={css({ w: "full", h: "auto", rounded: "md" })}
      />

      {/* 타이틀 & 아티스트 */}
      <div className={css({ mt: "4" })}>
        <div className={css({ fontWeight: "semibold" })}>{song.title}</div>
        <div className={css({ color: "gray.500" })}>{song.singer}</div>
      </div>

      {/* 오디오 */}
      <audio
        ref={audioRef}
        src={song.audio}
        preload="metadata"
        onLoadedMetadata={(e) => {
          const d = e.currentTarget.duration;
          console.log("🎧 오디오 duration:", d);
          if (!isNaN(d) && d > 0) setDuration(d);
        }}
      />

      {/* 플레이어 */}
      <div>
        <SongProgressBar
          currentTime={currentTime}
          duration={duration}
          onSeek={(time) => {
            if (audioRef.current) audioRef.current.currentTime = time;
          }}
        />
        <SongPlayer
          isPlaying={isPlaying}
          onTogglePlay={togglePlay}
          onForward={() => {
            if (audioRef.current) audioRef.current.currentTime += 10;
          }}
          onBackward={() => {
            if (audioRef.current) audioRef.current.currentTime -= 10;
          }}
        />
      </div>

      {/* 설명 + Help 버튼 */}
      <div>
        <div className={css({ whiteSpace: "pre-line", mb: "30" })}>
          {displayedContent}
          {isOverflow && (
            <button
              className={css({ color: "blue.600", fontSize: "sm", ml: "1" })}
              onClick={handleToggleContent}
            >
              {showFullContent ? "Show less" : "Show more"}
            </button>
          )}
        </div>
        <div
          className={css({
            display: "flex",
            justifyContent: "center", // 가로 가운데 정렬
            mt: "4", // 여백
          })}
        >
          <Link href={`/help/${params.id}/feedback`}>
            <Button size="md" variant="primary">
              Help
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
