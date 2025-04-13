import React from "react";
import { css } from "../../../styled-system/css";
import Image from "next/image";
import { ArtistProfilesProps } from "@/types/music";

const ArtistProfiles: React.FC<ArtistProfilesProps> = ({ artists }) => {
  return (
    <div
      className={css({
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: "0.5rem",
        marginLeft: "1rem",
      })}
    >
      {artists.map((artist, index) => (
        <div
          key={index}
          className={css({
            width: "2.5rem",
            height: "2.5rem",
            position: "relative",
            marginLeft: index > 0 ? "-1rem" : "0",
            borderRadius: "50%",
            border: "2px solid white",
            overflow: "hidden",
            boxShadow: "0 2px 4px -1px rgba(0, 0, 0, 0.1)",
            transition: "transform 0.2s",
            _hover: {
              transform: "translateY(-2px)",
              zIndex: 1,
            },
          })}
        >
          <Image
            src={artist.imageUrl}
            alt={artist.name}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      ))}
    </div>
  );
};

export default ArtistProfiles;
