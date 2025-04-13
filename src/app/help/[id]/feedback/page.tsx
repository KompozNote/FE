"use client";

import { useEffect, useRef, useState } from "react";
import { css } from "@/../../styled-system/css";
import AudioPlayer from "@/components/Audio/AudioPlayer";
import { LuPlay, LuPause } from "react-icons/lu";

export default function HelpPage() {
  const [audioTime, setAudioTime] = useState(0);
  const [duration, setDuration] = useState(90); // 테스트용 90초
  const [playing, setPlaying] = useState(false);
  const [selection, setSelection] = useState<[number, number]>([0, 10]);
  const [comment, setComment] = useState("");
  const [keyboardUp, setKeyboardUp] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 오디오 재생 컨트롤
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    playing ? audio.play() : audio.pause();
  }, [playing]);

  // 오디오 재생 시간 추적
  useEffect(() => {
    const interval = setInterval(() => {
      if (audioRef.current) setAudioTime(audioRef.current.currentTime);
    }, 300);
    return () => clearInterval(interval);
  }, []);

  // 키보드 올라왔는지 감지 (모바일 대응 시도용)
  useEffect(() => {
    const handler = () => setKeyboardUp(true);
    const handlerDown = () => setKeyboardUp(false);
    window.addEventListener("resize", handler); // 키보드 열릴 때 height 줄어듦
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
      })}
    >
      {/* 🖼 앨범 영역 (키보드 올라오면 사라짐) */}
      {!keyboardUp && (
        <div className={css({ p: "4", borderBottom: "1px solid #eee" })}>
          <div className={css({ mb: "2", fontWeight: "bold" })}>
            Title - Singer
          </div>
          <div className={css({ color: "gray.600", fontSize: "sm" })}>
            여기에 앨범 설명 또는 질문 내용이 들어갑니다. 키보드가 올라오면 이
            영역은 숨겨집니다.
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
        })}
      >
        <audio
          ref={audioRef}
          src="/audio/song1.mp3"
          preload="metadata"
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
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

      {/* 🔷 구간 선택 */}
      <AudioPlayer
        duration={duration}
        currentTime={audioTime}
        onSelectionChange={(start, end) => {
          setSelection([start, end]);
          setComment(`${formatTime(start)}~${formatTime(end)} `);
        }}
      />

      {/* 💬 댓글 입력창 */}
      <div
        className={css({
          marginTop: "auto",
          padding: "3",
          borderTop: "1px solid #eee",
          display: "flex",
          alignItems: "center",
          gap: "2",
        })}
      >
        <span
          className={css({
            fontSize: "sm",
            color: "blue.500",
            whiteSpace: "nowrap",
          })}
        >
          {formatTime(selection[0])}~{formatTime(selection[1])}
        </span>
        <input
          ref={inputRef}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="댓글을 입력하세요..."
          className={css({
            flex: 1,
            border: "none",
            outline: "none",
            fontSize: "sm",
            bg: "transparent",
          })}
        />
      </div>
    </div>
  );
}
