"use client";

import { useEffect, useRef, useState } from "react";
import { css } from "@/../../styled-system/css";
import AudioPlayer from "@/components/Audio/AudioPlayer";
import { LuPlay, LuPause } from "react-icons/lu";
import { songDataList } from "@/mock/songData";
import { notFound } from "next/navigation";
import ChatWidget from "@/components/Chat/ChatWidget";
import Image from "next/image";
import Button from "@/components/Buttons/Button";
type Props = {
  params: { id: string };
};

const formatTime = (seconds: number) => {
  seconds = seconds | 0;
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

export default function HelpPage({ params }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [duration, setDuration] = useState(90); // 초기값
  const [currentTime, setCurrentTime] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [selection, setSelection] = useState<[number, number]>([0, 10]);
  const [comment, setComment] = useState("");

  const song = songDataList.find((item) => item.id === params.id);
  if (!song) return notFound();

  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflow: "hidden",
      })}
    >
      {/* 🖼 앨범 영역 (키보드 올라오면 숨김) */}
      <div className={css({ p: "4", borderBottom: "1px solid #eee" })}>
        {/* 🔸 앨범 이미지 + 타이틀/가수 */}
        <div
          className={css({
            display: "flex",
            alignItems: "center",
            gap: "4",
            mb: "4",
          })}
        >
          <Image
            src={song.image}
            alt="앨범 이미지"
            width={110}
            height={110}
            className={css({
              objectFit: "cover",
              borderRadius: "md",
              flexShrink: 0,
            })}
          />
          <div>
            <div
              className={css({
                fontWeight: "bold",
                fontSize: "lg",
                mb: "1",
              })}
            >
              {song.title}
            </div>
            <div
              className={css({
                fontWeight: "semibold",
                color: "gray.500",
              })}
            >
              {song.singer}
            </div>
          </div>
        </div>

        {/* 🔹 앨범 설명 */}
        <div
          className={css({
            color: "gray.600",
            fontSize: "sm",
            whiteSpace: "pre-line",
          })}
        >
          {song.content}
        </div>
      </div>
      {/* 🎧 오디오 플레이어 */}
      <div
        className={css({
          display: "flex",
          alignItems: "center",
          gap: "2",
          p: "4",
          borderBottom: "1px solid #eee",
        })}
      >
        <audio
          ref={audioRef}
          src={song.audio}
          preload="metadata"
          onDurationChange={(e) => {
            setDuration(e.currentTarget.duration);
          }}
          onTimeUpdate={(e) => {
            setCurrentTime(e.currentTarget.currentTime);
          }}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />
        <Button
          onClick={() => {
            if (audioRef.current) {
              if (audioRef.current.paused) {
                audioRef.current.play();
              } else {
                audioRef.current.pause();
              }
            }
          }}
          className={css({
            p: "2",
            bg: "gray.200",
            rounded: "full",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          })}
        >
          {playing ? <LuPause /> : <LuPlay />}
        </Button>
        <span className={css({ fontSize: "sm", color: "gray.600" })}>
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
      </div>

      {/* 🔷 구간 선택 바 */}
      <AudioPlayer
        duration={duration}
        currentTime={currentTime}
        onSelectionChange={(start, end) => {
          setSelection([start, end]);
          setComment(`${formatTime(start)}~${formatTime(end)} `);
        }}
      />

      {/* 💬 채팅 영역 */}
      <ChatWidget />
    </div>
  );
}
