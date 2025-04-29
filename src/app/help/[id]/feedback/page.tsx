"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { css } from "@/../../styled-system/css";
import AudioPlayer from "@/components/Audio/AudioPlayer";
import { LuPlay, LuPause } from "react-icons/lu";
import { songDataList } from "@/mock/songData";
import { notFound } from "next/navigation";
import ChatWidget from "@/components/Chat/ChatWidget";
import Image from "next/image";
import Button from "@/components/Buttons/Button";
import { formatDuration } from "@/utils/formatTime";
import ProfileImg from "@/components/ProfileImg";
type Props = {
  params: { id: string };
};

const profiles = [
  { image: "/images/music/artists/city-sound.svg" },
  { image: "/images/music/artists/city-sound.svg" },
  { image: "/images/music/artists/city-sound.svg" },
  { image: "/images/music/artists/city-sound.svg" },
  { image: "/images/music/artists/city-sound.svg" },
  { image: "/images/music/artists/city-sound.svg" }, // 6번째부터는 "+N"으로 표시
];

export default function HelpPage({ params }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [duration, setDuration] = useState(90); // 초기값
  const [currentTime, setCurrentTime] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [selection, setSelection] = useState<[number, number]>([0, 10]);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      // 키보드가 열렸는지 확인 (화면 높이가 줄어들면 키보드가 열렸다고 간주)
      setIsKeyboardVisible(window.innerHeight < 600); // 600px은 임의의 기준값
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const song = songDataList.find((item) => item.id === params.id);

  const handleSelectionChange = useCallback((start: number, end: number) => {
    setSelection([start, end]);
  }, []);

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
      {!isKeyboardVisible && (
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
              <div
                className={css({
                  display: "flex",
                  alignItems: "center",
                })}
              >
                {profiles.slice(0, 5).map((profile, index) => (
                  <div
                    key={index}
                    className={css({
                      position: "relative",
                      zIndex: index - 5, // 겹치는 순서 조정
                      marginLeft: 5 - index < 5 ? "-20px" : "0", // 겹침 효과
                    })}
                  >
                    <ProfileImg src={profile.image} alt={""} />
                  </div>
                ))}
                {profiles.length > 5 && (
                  <div
                    className={css({
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      backgroundColor: "#2f3e2f",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "14px",
                      fontWeight: "bold",
                      marginLeft: "-8px", // 겹침 효과
                      zIndex: 0,
                    })}
                  >
                    +{profiles.length - 5}
                  </div>
                )}
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
            <b>{song.title}</b>
            <br />
            {song.content}
          </div>
        </div>
      )}

      {/* 🎧 오디오 플레이어 */}
      <div
        className={css({
          display: "flex",
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
          {formatDuration(currentTime)} / {formatDuration(duration)}
        </span>
      </div>

      {/* 🔷 구간 선택 바 */}
      <AudioPlayer
        duration={duration}
        currentTime={currentTime}
        onSelectionChange={handleSelectionChange}
      />
      <div
        className={css({
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "2",
          borderRadius: "lg",
          fontWeight: "medium",
          fontSize: "sm",
          color: "blue.500",
          m: "auto",
          mt: "4",
        })}
      >
        <span>
          Start: <strong>{Math.floor(selection[0])}s ~</strong>
        </span>
        <span>
          End: <strong>{Math.floor(selection[1])}s</strong>
        </span>
      </div>
      {/* 💬 채팅 영역 */}
      <ChatWidget />
    </div>
  );
}
