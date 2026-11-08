import { motion } from 'motion/react';
import { Reveal } from './Reveal';
import { useStaticFrame } from './FrameContext';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { travel } from '../animations/motion';

export function Introduction({ active }: { active: boolean }) {
  const staticFrame = useStaticFrame();
  const reduce = useReducedMotion();
  const immediate = staticFrame || reduce;
  return (
    <motion.section
      className="introduction"
      aria-hidden={!active}
      initial={false}
      animate={{
        transform: active ? 'translateY(0px) scale(1)' : 'translateY(-100px) scale(0.94)',
        clipPath: active ? 'inset(0% 0% 0% 0%)' : 'inset(0% 0% 100% 0%)',
        opacity: active ? 1 : 0,
      }}
      transition={immediate ? { duration: 0 } : travel}
    >
      <p className="title-course"><Reveal text="PHKI · Philosophy, Art & Artificial Intelligence" delay={0.3} /></p>
      <h1 className="title-headline"><Reveal text="When AI writes the code." /></h1>
      <p className="title-subtitle"><Reveal text="Who takes responsibility?" delay={0.2} /></p>
      <p className="title-presenter"><Reveal text="Dominik Krystul · HSLU · 2026" delay={0.45} /></p>
    </motion.section>
  );
}
