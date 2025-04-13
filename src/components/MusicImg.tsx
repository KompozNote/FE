import React from "react";
import style from "./MusicImg.module.css";
import Image from "next/image";

interface MusicImgProps {
  src: string;
  alt?: string;
}

const MusicImg: React.FC<MusicImgProps> = ({ src, alt = "Music Cover" }) => {
  return (
    <div className={style.music_img_wrapper}>
      {src ? (
        <Image className={style.music_img} src={src} alt={alt} />
      ) : (
        <div className={style.placeholder}></div>
      )}
    </div>
  );
};

export default MusicImg;
