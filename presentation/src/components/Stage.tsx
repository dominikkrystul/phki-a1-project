import { useReducedMotion } from '../hooks/useReducedMotion';
import { motion } from 'motion/react';
import { Introduction } from './Introduction';
import { BrowserStage } from './BrowserStage';
import { Scene } from '../scenes/Scenes';
import { scenes } from '../navigation';
import { useStaticFrame } from './FrameContext';

export function Stage({ scene, step, scale = 1, cameraPaused = false, cinematicRun = 0, cinematicFinished = true, onCinematicComplete }: {
  scene: number;
  step: number;
  scale?: number;
  cameraPaused?: boolean;
  cinematicRun?: number;
  cinematicFinished?: boolean;
  onCinematicComplete?: (run: number) => void;
}) {
  const staticFrame = useStaticFrame();
  const reduce = useReducedMotion();
  const dark = scene === 4 || scene === 5 || (scene === 3 && step >= 1);

  return (
    <div
      className={`stage ${dark ? 'dark' : ''} ${staticFrame ? 'static-frame' : ''}`}
      style={{ transform: `scale(${scale})` }}
      data-scene={scene + 1}
      data-step={step}
      data-reduced-motion={reduce ? 'true' : 'false'}
      data-export-ready={staticFrame ? 'true' : undefined}
    >
      <motion.div
        className="scene-environment"
        initial={false}
        animate={{ backgroundColor: scene === 4 ? '#090b10' : scene === 5 ? '#101114' : '#f5f5f7' }}
        transition={{ duration: staticFrame ? 0 : reduce ? 0.12 : 0.9 }}
      />
      <BrowserStage scene={scene} step={step} cameraPaused={cameraPaused} cinematicRun={cinematicRun}
        cinematicFinished={cinematicFinished} onCinematicComplete={onCinematicComplete} />
      <Introduction active={scene === 0} />
      <main className="scene" aria-label={`${scenes[scene].title}, step ${step + 1}`}>
        <Scene scene={scene} step={step} />
      </main>
    </div>
  );
}
