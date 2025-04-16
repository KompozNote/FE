import React, { useState, useRef, useEffect } from "react";
import { css } from "../../../styled-system/css";
import Controls from "./Controls";
import ProgressBar from "./ProgressBar";
import AlbumCover from "./AlbumCover";
import ArtistProfiles from "./ArtistProfiles";
import { Track, MusicPlayerProps } from "@/types/music";

const MusicPlayer: React.FC<MusicPlayerProps> = ({ tracks }) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentTrack = tracks[currentTrackIndex];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      handleNext();
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentTrackIndex]);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handlePrevious = () => {
    const newIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    setCurrentTrackIndex(newIndex);
    setCurrentTime(0);
    setIsPlaying(false);
  };

  const handleNext = () => {
    const newIndex = (currentTrackIndex + 1) % tracks.length;
    setCurrentTrackIndex(newIndex);
    setCurrentTime(0);
    setIsPlaying(false);
  };

  const handleSeek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  return (
    <div
      className={css({
        backgroundColor: "white",
        borderRadius: "1rem",
        padding: "1.5rem",
        width: "100%",
        maxWidth: "400px",
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
      })}
    >
      <audio ref={audioRef} src={currentTrack.url} />

      <AlbumCover
        imageUrl={currentTrack.coverImage}
        alt={`${currentTrack.title} cover`}
      />

      <div
        className={css({
          marginBottom: "1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 1rem",
        })}
      >
        <div
          className={css({
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "0.25rem",
          })}
        >
          <h2
            className={css({
              fontSize: "1.25rem",
              fontWeight: "600",
              color: "#1F2937",
            })}
          >
            {currentTrack.title}
          </h2>
          <p
            className={css({
              fontSize: "0.875rem",
              color: "#6B7280",
            })}
          >
            {currentTrack.artist}
          </p>
        </div>
        <ArtistProfiles artists={currentTrack.artists} />
      </div>

      <ProgressBar
        currentTime={currentTime}
        duration={currentTrack.duration}
        onSeek={handleSeek}
      />

      <div
        className={css({
          marginTop: "1.5rem",
        })}
      >
        <Controls
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      </div>
    </div>
  );
};

export default MusicPlayer;
