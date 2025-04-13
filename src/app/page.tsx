"use client";
import { css } from "../../styled-system/css";
import Button from "@/components/Buttons/Button";
import { FaCode } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { LuPlus, LuArrowLeft } from "react-icons/lu";
import SongPlayer from "@/components/SongPlayer/SongPlayer";
import SongProgressBar from "@/components/SongPlayer/SongProgressBar";
import AudioSelector from "@/components/Audio/AudioPlayer";


export default function Home() {
  const router = useRouter();
  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        fontSize: "10em",
        fontWeight: "bold",
        justifyContent: "center",
        alignItems: "center",
        gap: "0.1em",
      })}
    >


      <AudioSelector
        duration={0}
        currentTime={300}
        onSelectionChange={() => {}}
      />
      <SongProgressBar duration={0} currentTime={300} onSeek={() => {}} />
      <SongPlayer />
    </div>
  );
}
