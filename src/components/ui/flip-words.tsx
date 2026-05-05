import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const FlipWords = ({
  words,
  duration = 3000,
  className,
  style,
}: {
  words: string[];
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}) => {
  const [currentWord, setCurrentWord] = useState(words[0]);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const startAnimation = useCallback(() => {
    const word = words[words.indexOf(currentWord) + 1] || words[0];
    setCurrentWord(word);
    setIsAnimating(true);
  }, [currentWord, words]);

  useEffect(() => {
    if (!isAnimating)
      setTimeout(() => {
        startAnimation();
      }, duration);
  }, [isAnimating, duration, startAnimation]);

  return (
    <span className="inline-block relative min-h-[1.5em]">
      <AnimatePresence
        mode="wait"
        onExitComplete={() => {
          setIsAnimating(false);
        }}
      >
        <motion.span
          initial={{
            opacity: 0,
            y: 8,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.4,
            ease: "easeOut",
          }}
          exit={{
            opacity: 0,
            y: -8,
            transition: {
              duration: 0.3,
              ease: "easeIn",
            }
          }}
          className={cn(
            "inline-block whitespace-nowrap",
            className
          )}
          style={style}
          key={currentWord}
        >
          {currentWord}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};
