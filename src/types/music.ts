export interface Artist {
  name: string;
  imageUrl: string;
}

export interface Track {
  title: string;
  artist: string;
  duration: number;
  url: string;
  coverImage: string;
  artists: Artist[];
}

export interface MusicPlayerProps {
  tracks: Track[];
}

export interface ControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

export interface ProgressBarProps {
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
}

export interface AlbumCoverProps {
  imageUrl: string;
  alt: string;
}

export interface ArtistProfilesProps {
  artists: Artist[];
}
