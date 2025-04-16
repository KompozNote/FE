import React from "react";
import { css } from "../../../styled-system/css";
import { LuSkipBack, LuSkipForward, LuPlay, LuPause } from "react-icons/lu";
import { ControlsProps } from "@/types/music";

const Controls: React.FC<ControlsProps> = ({
  isPlaying,
  onPlayPause,
  onPrevious,
  onNext,
}) => {
  return (
    <div
      className={css({
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
      })}
    >
      <button
        onClick={onPrevious}
        className={css({
          color: "#4B5563",
          padding: "0.5rem",
          borderRadius: "50%",
          transition: "all 0.2s",
          _hover: {
            color: "#1F2937",
            backgroundColor: "#F3F4F6",
          },
        })}
      >
        <LuSkipBack size={24} />
      </button>
      <button
        onClick={onPlayPause}
        className={css({
          backgroundColor: "#3B82F6",
          color: "white",
          padding: "0.75rem",
          borderRadius: "50%",
          transition: "all 0.2s",
          _hover: {
            backgroundColor: "#2563EB",
          },
        })}
      >
        {isPlaying ? <LuPause size={24} /> : <LuPlay size={24} />}
      </button>
      <button
        onClick={onNext}
        className={css({
          color: "#4B5563",
          padding: "0.5rem",
          borderRadius: "50%",
          transition: "all 0.2s",
          _hover: {
            color: "#1F2937",
            backgroundColor: "#F3F4F6",
          },
        })}
      >
        <LuSkipForward size={24} />
      </button>
    </div>
  );
};

export default Controls;
