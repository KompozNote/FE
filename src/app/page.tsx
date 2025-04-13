// "use client";

// import MusicPlayer from "@/components/MusicPlayer/MusicPlayer";
// import { Track } from "@/types/music";
// import { css } from "../../styled-system/css";
// import Button from "@/components/Buttons/Button";
// import { useRouter } from "next/navigation";
// import { LuPlus, LuArrowLeft } from "react-icons/lu";
// import SongPlayer from "@/components/SongPlayer/SongPlayer";
// import SongProgressBar from "@/components/SongPlayer/SongProgressBar";
// import AudioSelector from "@/components/Audio/AudioPlayer";
// import Link from "next/link";

// export default function Home() {
//   const tracks: Track[] = [
//     {
//       title: "Test Track 1",
//       artist: "Global PBL 1",
//       duration: 180,
//       url: "/path/to/audio1.mp3",
//       coverImage: "/images/music/covers/midnight-dreams.svg",
//       artists: [
//         {
//           name: "Sarah Chen",
//           imageUrl: "/images/music/artists/sarah-chen.svg",
//         },
//         {
//           name: "Marcus Kim",
//           imageUrl: "/images/music/artists/marcus-kim.svg",
//         },
//         {
//           name: "Elena Rodriguez",
//           imageUrl: "/images/music/artists/elena-rodriguez.svg",
//         },
//       ],
//     },
//     {
//       title: "Test Track 2",
//       artist: "Global PBL 2",
//       duration: 240,
//       url: "/path/to/audio2.mp3",
//       coverImage: "/images/music/covers/urban-echoes.svg",
//       artists: [
//         {
//           name: "The City Sound",
//           imageUrl: "/images/music/artists/city-sound.svg",
//         },
//       ],
//     },
//   ];

//   return (
//     <main
//       className={css({
//         display: "flex",
//         flexDirection: "column",
//         fontSize: "10em",
//         fontWeight: "bold",
//         justifyContent: "center",
//         alignItems: "center",
//         gap: "0.1em",
//       })}
//     >
//       <AudioSelector
//         duration={0}
//         currentTime={300}
//         onSelectionChange={() => {}}
//       />
//       <SongProgressBar duration={0} currentTime={300} onSeek={() => {}} />
//       <SongPlayer />
//     </main>
//   );
// }
