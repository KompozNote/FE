"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "@/components/Buttons/Button";
import SongPlayer from "@/components/SongPlayer/SongPlayer";
import SongProgressBar from "@/components/SongPlayer/SongProgressBar";
import { css } from "@/../../styled-system/css";
import { stack } from "@/../../styled-system/patterns";
import { songData } from "@/mock/songData";

export default function Help() {
  const [showFullContent, setShowFullContent] = useState(false);

  const handleToggleContent = () => {
    setShowFullContent((prev) => !prev);
  };

  const isOverflow = songData.content.length > 100;
  const displayedContent =
    showFullContent || !isOverflow
      ? songData.content
      : songData.content.slice(0, 100) + "...";

  return (
    <div
      className={stack({
        gap: "4",
        p: "4",
        h: "100vh",
        bg: "white",
        justify: "space-between",
      })}
    >
      {/* 앨범 이미지 */}
      <Image
        src="/mock_album.png"
        alt="Album"
        width={512}
        height={512}
        className={css({ w: "full", h: "auto", rounded: "md" })}
      />

      {/* 노래 정보 */}
      <div className={css({ mt: "4" })}>
        <div className={css({ fontWeight: "semibold" })}>{songData.title}</div>
        <div className={css({ color: "gray.500" })}>{songData.singer}</div>
      </div>

      {/* 플레이어 */}
      <div className={stack({ gap: "2" })}>
        <SongProgressBar currentTime={0} duration={0} onSeek={() => {}} />
        <SongPlayer />
      </div>

      {/* 콘텐츠 설명 */}
      <div>
        <div className={css({ whiteSpace: "pre-line", mb: "2" })}>
          {displayedContent}
          {isOverflow && (
            <button
              className={css({ color: "blue.600", fontSize: "sm", ml: "1" })}
              onClick={handleToggleContent}
            >
              {showFullContent ? "간단히 보기" : "더 보기"}
            </button>
          )}
        </div>

        {/* Help 버튼 */}
        <Button size="md" variant="primary">
          Help
        </Button>
      </div>
    </div>
  );
}
