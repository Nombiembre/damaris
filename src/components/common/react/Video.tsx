interface VideoPlayerProps {
  sources: { src: string; type: string }[];
  poster?: string;
  controls?: boolean;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  width?: number;
  height?: number;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  sources,
  poster,
  controls = true,
  autoplay = false,
  loop = false,
  muted = false,
  width = 640,
  height = 360,
}) => {

  return (
    <div>
      <video
        width={width}
        height={height}
        controls={controls}
        autoPlay={autoplay}
        loop={loop}
        muted={muted}
        poster={poster}
        playsInline
        className="rounded-xl"
        preload="metadata"
      >
        {sources.map((source, index) => (
          <source key={index} src={source.src} type={source.type} />
        ))}
        Tu navegador no soporta videos.
      </video>


    </div>
  );
};

export default VideoPlayer;
