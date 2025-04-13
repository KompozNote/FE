"use client";

import { useEffect, useRef, useState } from "react";
import { css } from "@/../../styled-system/css";

interface AudioSelectorProps {
  duration: number;
  currentTime: number;
  onSelectionChange: (start: number, end: number) => void;
}

export default function AudioSelector({
  duration,
  currentTime,
  onSelectionChange,
}: AudioSelectorProps) {
  const barRef = useRef<HTMLDivElement>(null);
  const [selectionStart, setSelectionStart] = useState(0);
  const [selectionEnd, setSelectionEnd] = useState(duration * 0.3); // 초기 30%까지만 선택
  const [dragTarget, setDragTarget] = useState<"start" | "end" | null>(null);

  const formatTime = (time: number) => {
    const m = Math.floor(time / 60);
    const s = Math.floor(time % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const getTimeFromPosition = (clientX: number) => {
    if (!barRef.current) return 0;
    const rect = barRef.current.getBoundingClientRect();
    const percent = Math.min(
      Math.max(0, (clientX - rect.left) / rect.width),
      1
    );
    return percent * duration;
  };

  const handleMouseDown = (type: "start" | "end") => (e: React.MouseEvent) => {
    e.preventDefault();
    setDragTarget(type);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!dragTarget) return;
    const time = getTimeFromPosition(e.clientX);
    if (dragTarget === "start") {
      setSelectionStart(Math.min(time, selectionEnd - 1)); // 최소 1초 간격
    } else {
      setSelectionEnd(Math.max(time, selectionStart + 1));
    }
  };

  const handleMouseUp = () => {
    if (dragTarget) {
      setDragTarget(null);
      onSelectionChange(selectionStart, selectionEnd);
    }
  };

  useEffect(() => {
    if (dragTarget) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragTarget]);

  const startPercent = (selectionStart / duration) * 100;
  const endPercent = (selectionEnd / duration) * 100;
  const progressPercent = (currentTime / duration) * 100;

  return (
    <div>
      <div
        ref={barRef}
        className={css({
          position: "relative",
          height: "40px",
          backgroundColor: "gray.200",
          borderRadius: "md",
          my: "4",
          w: "370px",
        })}
      >
        {/* 선택 구간 */}
        <div
          className={css({
            position: "absolute",
            top: 0,
            height: "100%",
            left: `${startPercent}%`,
            width: `${endPercent - startPercent}%`,
            bg: "blue.100",
          })}
        />
        {/* 현재 재생 위치 */}
        <div
          className={css({
            position: "absolute",
            top: 0,
            bottom: 0,
            left: `${progressPercent}%`,
            width: "2px",
            bg: "red.500",
          })}
        />
        {/* 좌측 핸들 */}
        <div
          onMouseDown={handleMouseDown("start")}
          className={css({
            position: "absolute",
            top: "-6px",
            left: `${startPercent}%`,
            transform: "translateX(-50%)",
            width: "0",
            height: "0",
            borderLeft: "6px solid transparent",
            borderRight: "6px solid transparent",
            borderBottom: "10px solid blue.600",
            cursor: "ew-resize",
          })}
        />
        {/* 우측 핸들 */}
        <div
          onMouseDown={handleMouseDown("end")}
          className={css({
            position: "absolute",
            top: "-6px",
            left: `${endPercent}%`,
            transform: "translateX(-50%)",
            width: "0",
            height: "0",
            borderLeft: "6px solid transparent",
            borderRight: "6px solid transparent",
            borderBottom: "10px solid blue.600",
            cursor: "ew-resize",
          })}
        />
      </div>

      <div
        className={css({
          fontSize: "sm",
          color: "blue",
          textAlign: "center",
        })}
      >
        {formatTime(selectionStart)} ~ {formatTime(selectionEnd)}
      </div>
    </div>
  );
}
