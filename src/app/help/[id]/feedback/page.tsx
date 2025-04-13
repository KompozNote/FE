"use client";

import { useEffect, useRef, useState } from "react";
import { css } from "@/../../styled-system/css";
import AudioPlayer from "@/components/Audio/AudioPlayer";
import { LuPlay, LuPause } from "react-icons/lu";
import { songDataList } from "@/mock/songData";
import { notFound } from "next/navigation";
import ChatWidget from "@/components/Chat/ChatWidget";

type Props = {
  params: { id: string };
};

export default function HelpPage({ params }: Props) {
  const song = songDataList.find((item) => item.id === params.id);
  if (!song) return notFound();

  const [audioTime, setAudioTime] = useState(0);
  const [duration, setDuration] = useState(90); // 초기값
  const [playing, setPlaying] = useState(false);
  const [selection, setSelection] = useState<[number, number]>([0, 10]);
  const [comment, setComment] = useState("");
  const [keyboardUp, setKeyboardUp] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 🎧 오디오 재생/일시정지
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    playing ? audio.play() : audio.pause();
  }, [playing]);

  // 현재 재생 시간 추적
  useEffect(() => {
    const interval = setInterval(() => {
      if (audioRef.current) setAudioTime(audioRef.current.currentTime);
    }, 300);
    return () => clearInterval(interval);
  }, []);

  // 키보드 올라옴 감지
  useEffect(() => {
    const handler = () => setKeyboardUp(true);
    const handlerDown = () => setKeyboardUp(false);
    window.addEventListener("resize", handler);
    inputRef.current?.addEventListener("blur", handlerDown);
    return () => {
      window.removeEventListener("resize", handler);
      inputRef.current?.removeEventListener("blur", handlerDown);
    };
  }, []);

  const formatTime = (time: number) => {
    const m = Math.floor(time / 60);
    const s = Math.floor(time % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div
      className={css({
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      })}
    >
      {/* 🖼 앨범 영역 (키보드 올라오면 숨김) */}
      {!keyboardUp && (
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
            <img
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
      )}

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
          onLoadedMetadata={(e) => {
            const d = e.currentTarget.duration;
            if (!isNaN(d) && d > 0) setDuration(d);
          }}
        />
        <button
          onClick={() => setPlaying(!playing)}
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
        </button>
        <span className={css({ fontSize: "sm", color: "gray.600" })}>
          {formatTime(audioTime)} / {formatTime(duration)}
        </span>
      </div>

      {/* 🔷 구간 선택 바 */}
      <AudioPlayer
        duration={duration}
        currentTime={audioTime}
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
