import { useReducedMotion } from '../hooks/useReducedMotion';
import { motion } from 'motion/react';
import { revealEase } from '../animations/motion';
import { useStaticFrame } from './FrameContext';

export function Reveal({ text, className = '', delay = 0 }: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const staticFrame = useStaticFrame();

  return (
    <span className={`reveal ${className}`} aria-label={text}>
      {text.split(' ').map((word, index) => (
        <span className="word-mask" key={`${word}-${index}`} aria-hidden="true">
          <motion.span
            initial={staticFrame ? false : {
              transform: reduce ? 'none' : 'translateY(108%)',
              opacity: 0,
            }}
            animate={{ transform: 'translateY(0%)', opacity: 1 }}
            transition={{
              duration: staticFrame ? 0 : reduce ? 0.12 : 0.72,
              ease: revealEase,
              delay: staticFrame || reduce ? 0 : delay + index * 0.045,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
