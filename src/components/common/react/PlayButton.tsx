import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

type AudioPlayerProps = {
  src: string;
  text: string;
  timeout?: number;
};

export default function AudioPlayer({ src, text, timeout }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlay = () => {
    setIsPlaying(true); // Ocultar el botón inmediatamente

    if (audioRef.current) {
      if (timeout) {
        setTimeout(() => {
          audioRef.current?.play();
        }, timeout);
      } else {
        audioRef.current.play();
      }
    }
  };

  return (
    <div>
      <audio ref={audioRef} src={src} onPlay={() => setIsPlaying(true)} onEnded={() => setIsPlaying(false)} />
      <AnimatePresence>
        {!isPlaying && (
          <motion.button
            onClick={handlePlay}
            className="bg-primary text-black px-4 py-1 rounded-full block mx-auto transition-all hover:bg-transparent border border-transparent hover:border-primary hover:text-primary cursor-pointer uppercase font-bold"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {text}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
