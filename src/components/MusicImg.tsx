import React from "react";
import style from "./MusicImg.module.css";
import Image from "next/image";
import { css } from "@/../../styled-system/css";

interface MusicImgProps {
  src: string;
  alt?: string;
}

const MusicImg: React.FC<MusicImgProps> = ({ src, alt = "Music Cover" }) => {
  return (
    <div
      className={css({
        width: "100%",
        height: 0,
        paddingTop: "100%",
        position: "relative",
        backgroundColor: "#e0e0e0",
        border: "1px solid #ccc",
        borderRadius: "8px",
        overflow: "hidden",
      })}
    >
      {src ? (
        <Image className={style.music_img} src={src} alt={alt} />
      ) : (
        <div
          className={css({
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "#ccc",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "14px",
            color: "#888",
          })}
        >
          {alt}
        </div>
      )}
    </div>
  );
};

export default MusicImg;
