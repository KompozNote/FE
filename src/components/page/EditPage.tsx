import { LuPlay } from "react-icons/lu";
import { LuPause } from "react-icons/lu";
import { css } from "../../../styled-system/css";
import Button from "../Buttons/Button";
import Header from "../Header";
import Text from "../Text";
import AudioPlayer from "@/components/Audio/AudioPlayer";
import { useState, useRef } from "react";

export default function EditPage({ basePath }: { basePath: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        height: "100vh",
        padding: "30px 16px",
        gap: "16px",
        backgroundColor: "#fff",
      })}
    >
      <Header nextStepUrl={`/post/${basePath}?step=title`} />

      <div
        className={css({
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: "100%",
          padding: "0 16px",
          marginTop: "30px",
        })}
      >
        {" "}
        <Text as="h1" className={css({ marginBottom: "20px" })}>
          Edit your mp3 file
        </Text>
        <div
          className={css({
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "0.5rem",
            padding: "0px 8px",
            fontWeight: "500",
            backgroundColor: "#3b82f6",
            color: "white",
            marginBottom: "10px",
          })}
        >
          <Button
            variant="icon"
            onClick={() => {
              if (audioRef.current) {
                if (audioRef.current.paused) {
                  audioRef.current.play();
                } else {
                  audioRef.current.pause();
                }
              }
            }}
            className={css({
              justifyContent: "start",
            })}
          >
            {playing ? <LuPause /> : <LuPlay />}
          </Button>
          <span>test.mp3</span>
          <span>00:00</span>
        </div>
        <AudioPlayer
          duration={100}
          currentTime={0}
          onSelectionChange={() => {}}
        />
      </div>
    </div>
  );
}
