import React from "react";
import { css } from "../../../styled-system/css";
import Image from "next/image";
import { AlbumCoverProps } from "@/types/music";

const AlbumCover: React.FC<AlbumCoverProps> = ({ imageUrl, alt }) => {
  return (
    <div
      className={css({
        width: "100%",
        aspectRatio: "1",
        position: "relative",
        borderRadius: "0.5rem",
        overflow: "hidden",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        marginBottom: "2rem",
      })}
    >
      <Image
        src={imageUrl}
        alt={alt}
        fill
        style={{ objectFit: "cover" }}
        priority
      />
    </div>
  );
};

export default AlbumCover;
