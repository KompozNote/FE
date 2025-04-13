"use client";

import MusicPlayer from "@/components/MusicPlayer/MusicPlayer";
import { Track } from "@/types/music";
import { css } from "../../styled-system/css";
import ChatWidget from "@/components/Chat/ChatWidget";

export default function Home() {
  const tracks: Track[] = [
    {
      title: "Test Track 1",
      artist: "Global PBL 1",
      duration: 180,
      url: "/path/to/audio1.mp3",
      coverImage: "/images/music/covers/midnight-dreams.svg",
      artists: [
        {
          name: "Sarah Chen",
          imageUrl: "/images/music/artists/sarah-chen.svg",
        },
        {
          name: "Marcus Kim",
          imageUrl: "/images/music/artists/marcus-kim.svg",
        },
        {
          name: "Elena Rodriguez",
          imageUrl: "/images/music/artists/elena-rodriguez.svg",
        },
      ],
    },
    {
      title: "Test Track 2",
      artist: "Global PBL 2",
      duration: 240,
      url: "/path/to/audio2.mp3",
      coverImage: "/images/music/covers/urban-echoes.svg",
      artists: [
        {
          name: "The City Sound",
          imageUrl: "/images/music/artists/city-sound.svg",
        },
      ],
    },
  ];

  return (
    <main
      className={css({
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        position: "relative",
      })}
    >
      <div
        className={css({
          display: "flex",
          flexDirection: "column",
          height: "calc(100vh - 4rem)",
          padding: "2rem",
          gap: "2rem",
        })}
      >
        <div
          className={css({
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            height: "100%",
          })}
        >
          <MusicPlayer tracks={tracks} />
          <ChatWidget />
        </div>
      </div>
    </main>
  );
}
