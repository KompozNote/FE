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
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showFullContent, setShowFullContent] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime);
      }
    }, 200);
    return () => clearInterval(interval);
  }, []);

  const song = songDataList.find((item) => item.id === params.id);
  if (!song) return notFound();

  const isOverflow = song.content.length > 100;
  const displayedContent =
    showFullContent || !isOverflow
      ? song.content
      : song.content.slice(0, 100) + "...";

  const handleToggleContent = () => {
    setShowFullContent((prev) => !prev);
  };

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
      className={css({
        display: "flex",
        flexDirection: "column",
        padding: "1em",
        gap: "1em",
        overflowY: "auto",
      })}
    >
      {/* 앨범 이미지 */}
      <div
        className={css({
          position: "relative",
          width: "100%",
          borderRadius: "8px",
          overflow: "hidden",
        })}
      >
        <Image
          src={song.image}
          alt="Album"
          width={512}
          height={512}
          className={css({ w: "full", h: "auto" })}
        />

        {/* 게시글 제목 및 내용 */}
        {showFullContent && (
          <div
            className={css({
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.6)", // 반투명 배경
              color: "#fff",
              padding: "1em",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              overflowY: "auto", // 내용이 넘칠 경우 스크롤 활성화
            })}
          >
            <h2
              className={css({
                fontWeight: "bold",
                marginBottom: "0.5em",
                whiteSpace: "nowrap", // 제목이 한 줄로 유지되도록 설정
                overflow: "hidden", // 넘치는 텍스트 숨김
                textOverflow: "ellipsis", // 말줄임표 추가
              })}
            >
              {song.title}
            </h2>
            <p
              className={css({
                fontSize: "14px",
                lineHeight: "1.5",
                overflowY: "auto", // 내용이 넘칠 경우 스크롤 활성화
                maxHeight: "80%", // 최대 높이 제한
              })}
            >
              {song.content}
            </p>
          </div>
        )}

        {/* 버튼 */}
        <button
          onClick={handleToggleContent}
          className={css({
            position: "absolute",
            bottom: 0,
            width: "100%",
            padding: "12px",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            color: "#fff",
            fontSize: "16px",
            fontWeight: "bold",
            border: "none",
            cursor: "pointer",
          })}
        >
          {showFullContent ? "Hide Details" : "Show Details"}
        </button>
      </div>

      {/* 타이틀 & 아티스트 */}
      <div>
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
        <div
          className={css({
            display: "flex",
            justifyContent: "center", // 가로 가운데 정렬
            mt: "4", // 여백
          })}
        >
          <Link
            href={`/help/${params.id}/feedback`}
            className={css({ width: "100%" })}
          >
            <Button className={css({ width: "100%" })}>Help</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
