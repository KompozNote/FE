import React from "react";
import { css } from "../../../styled-system/css";
import { ProgressBarProps } from "@/types/music";

const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const ProgressBar: React.FC<ProgressBarProps> = ({
  currentTime,
  duration,
  onSeek,
}) => {
  const progress = (currentTime / duration) * 100;

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const bar = e.currentTarget;
    const rect = bar.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    onSeek(percentage * duration);
  };

  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        width: "100%",
        padding: "0 1rem",
      })}
    >
      <div
        className={css({
          width: "100%",
          height: "4px",
          backgroundColor: "#E5E7EB",
          borderRadius: "2px",
          cursor: "pointer",
          position: "relative",
          _hover: {
            "& > div": {
              backgroundColor: "#3B82F6",
            },
          },
        })}
        onClick={handleClick}
      >
        <div
          className={css({
            position: "absolute",
            left: 0,
            top: 0,
            height: "100%",
            backgroundColor: "#60A5FA",
            borderRadius: "2px",
            transition: "width 0.1s ease-out",
          })}
          style={{ width: `${progress}%` }}
        />
      </div>
      <div
        className={css({
          display: "flex",
          justifyContent: "space-between",
          fontSize: "0.75rem",
          color: "#6B7280",
        })}
      >
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
