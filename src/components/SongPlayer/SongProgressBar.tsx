"use client";

import { useState, useRef, useEffect } from "react";
import { css } from "../../../styled-system/css";
import { flex } from "../../../styled-system/patterns";

interface SongProgressBarProps {
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
}

export default function SongProgressBar({
  currentTime,
  duration,
  onSeek,
}: SongProgressBarProps) {
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleSeek = (clientX: number) => {
    if (!progressBarRef.current) return;

    const rect = progressBarRef.current.getBoundingClientRect();
    const percent = Math.min(
      Math.max(0, (clientX - rect.left) / rect.width),
      1
    );
    onSeek(percent * duration);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleSeek(e.clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      handleSeek(e.clientX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className={css({ mb: "2" })}>
      <div
        ref={progressBarRef}
        className={css({
          h: "4px",
          w: "370px",
          bg: "gray.200",
          borderRadius: "full",
          my: "2",
          cursor: "pointer",
          position: "relative",
        })}
        onMouseDown={handleMouseDown}
      >
        <div
          className={css({
            position: "absolute",
            top: 0,
            left: 0,
            h: "100%",
            bg: "gray.600",
            borderRadius: "full",
            w: `${progress}%`,
            transition: isDragging ? "none" : "width 0.1s ease-in-out",
          })}
        />
        <div
          className={css({
            position: "absolute",
            h: "12px",
            w: "12px",
            bg: "gray.700",
            borderRadius: "full",
            top: "50%",
            transform: "translateY(-50%)",
            left: `calc(${progress}% - 6px)`,
            transition: isDragging ? "none" : "left 0.1s ease-in-out",
            _hover: {
              h: "14px",
              w: "14px",
              left: `calc(${progress}% - 7px)`,
            },
          })}
        />
      </div>
      <div
        className={flex({
          justify: "space-between",
          align: "center",
        })}
      >
        <span
          className={css({
            fontSize: "xs",
            color: "gray.600",
          })}
        >
          {formatTime(currentTime)}
        </span>
        <span
          className={css({
            fontSize: "xs",
            color: "gray.600",
          })}
        >
          {formatTime(duration)}
        </span>
      </div>
    </div>
  );
}
