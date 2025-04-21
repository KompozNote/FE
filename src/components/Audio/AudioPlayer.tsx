"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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
  const [finalSelectionStart, setFinalSelectionStart] = useState(0);
  const [finalSelectionEnd, setFinalSelectionEnd] = useState(0);
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

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!dragTarget) return;
      const time = getTimeFromPosition(e.clientX);
      if (dragTarget === "start") {
        setSelectionStart(Math.min(time, selectionEnd - 1)); // 최소 1초 간격
      } else {
        setSelectionEnd(Math.max(time, selectionStart + 1));
      }
    },
    [dragTarget, selectionStart, selectionEnd]
  );

  const handleMouseUp = useCallback(
    (e: MouseEvent) => {
      if (dragTarget) {
        setDragTarget(null);
        const time = getTimeFromPosition(e.clientX);
        if (dragTarget === "start") {
          setSelectionStart(time);
          setFinalSelectionStart(time);
        } else {
          setSelectionEnd(time);
          setFinalSelectionEnd(time);
        }
      }
    },
    [dragTarget, selectionStart, selectionEnd]
  );

  useEffect(() => {
    onSelectionChange(finalSelectionStart, finalSelectionEnd);
  }, [finalSelectionStart, finalSelectionEnd, onSelectionChange]);

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
          width: "100%",
          maxWidth: "100%",
          backgroundColor: "gray.200",
        })}
      >
        {/* 선택 구간 */}
        <div
          className={css({
            position: "absolute",
            top: 0,
            bottom: 0,
            bg: "blue.100",
          })}
          style={{
            left: `${startPercent}%`,
            width: `${endPercent - startPercent}%`,
          }}
        />
        {/* 현재 재생 위치 */}
        <div
          className={css({
            position: "absolute",
            top: 0,
            bottom: 0,
            width: "2px",
            bg: "red.500",
          })}
          style={{
            left: `${progressPercent}%`,
          }}
        />
        {/* 좌측 핸들 */}
        <div
          onMouseDown={handleMouseDown("start")}
          className={css({
            position: "absolute",
            top: 0,
            bottom: 0,
            width: "2px",
            backgroundColor: "blue.600",
            cursor: "ew-resize",
          })}
          style={{
            left: `${startPercent}%`,
          }}
        />
        {/* 우측 핸들 */}
        <div
          onMouseDown={handleMouseDown("end")}
          className={css({
            position: "absolute",
            top: 0,
            bottom: 0,
            width: "2px",
            backgroundColor: "blue.600",
            cursor: "ew-resize",
          })}
          style={{
            left: `${endPercent}%`,
          }}
        />
      </div>

      <div
        className={css({
          fontSize: "sm",
          color: "blue",
          textAlign: "center",
        })}
      ></div>
    </div>
  );
}
