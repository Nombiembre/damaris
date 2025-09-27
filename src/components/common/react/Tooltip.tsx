import { useEffect, useRef, useState } from "react";

interface TooltipProps {
  word: string;
  meaning: string;
  variant?: "light";
}

// Definir un tipo que permita opcionalmente 'right'
type TooltipStyle = {
  left?: string;
  right?: string;
  transform?: string;
};

export default function Tooltip({ word, meaning, variant }: TooltipProps) {
  const wordRef = useRef<HTMLSpanElement>(null);
  const meaningRef = useRef<HTMLSpanElement>(null);
  const [tooltipStyle, setTooltipStyle] = useState<TooltipStyle>({
    left: "50%",
    transform: "translateX(-50%)",
  });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function positionTooltip() {
      if (!wordRef.current || !meaningRef.current) return;

      const wordRect = wordRef.current.getBoundingClientRect();
      const meaningRect = meaningRef.current.getBoundingClientRect();
      const screenWidth = window.innerWidth;

      let style: TooltipStyle = { left: "50%", transform: "translateX(-50%)" };

      const isCentered =
        wordRect.left > screenWidth * 0.25 &&
        wordRect.right < screenWidth * 0.75;

      if (isCentered) {
        // Si está en el centro de la pantalla, se alinea correctamente
        style = { left: "50%", transform: "translateX(-50%)" };
      } else if (wordRect.left < 50) {
        // Si está cerca del borde izquierdo
        style = { left: "0%", transform: "none" };
      } else if (wordRect.right + meaningRect.width > screenWidth - 10) {
        // Si está cerca del borde derecho
        style = { right: "0%", left: "auto", transform: "none" };
      }

      setTooltipStyle(style);
    }

    positionTooltip();
    window.addEventListener("resize", positionTooltip);
    return () => window.removeEventListener("resize", positionTooltip);
  }, []);

  // Mostrar tooltip solo al pasar por `word` o `meaning`
  useEffect(() => {
    function showTooltip() {
      setVisible(true);
    }

    function hideTooltip(event: MouseEvent) {
      if (
        wordRef.current &&
        meaningRef.current &&
        !wordRef.current.contains(event.relatedTarget as Node) &&
        !meaningRef.current.contains(event.relatedTarget as Node)
      ) {
        setVisible(false);
      }
    }

    wordRef.current?.addEventListener("mouseenter", showTooltip);
    wordRef.current?.addEventListener("mouseleave", hideTooltip);
    meaningRef.current?.addEventListener("mouseleave", hideTooltip);

    return () => {
      wordRef.current?.removeEventListener("mouseenter", showTooltip);
      wordRef.current?.removeEventListener("mouseleave", hideTooltip);
      meaningRef.current?.removeEventListener("mouseleave", hideTooltip);
    };
  }, []);

  return (
    <span className="relative inline-block">
      <span
        ref={wordRef}
        className={`
          ${variant === "light" ? "bg-primary hover:bg-primary/80" : "bg-slate-800 hover:bg-slate-800/80"}
          inline-block  px-1 rounded-md  transition-all duration-300`}
      >
        {word}
      </span>
      <span
        ref={meaningRef}
        style={{
          ...tooltipStyle,
          opacity: visible ? 1 : 0,
          pointerEvents: visible ? "auto" : "none",
        }}
        className="absolute top-full py-1 max-w-[250px] md:max-w-xs w-max transition-opacity duration-300 z-50"
      >
        <span
          className={`
          ${variant === "light" ? "bg-primary" : "bg-gray-800 text-white"}
           md:mx-2  px-2 py-1 text-sm md:text-base rounded-md inline-block text-pretty`}
        >
          {meaning}
        </span>
      </span>
    </span>
  );
}
