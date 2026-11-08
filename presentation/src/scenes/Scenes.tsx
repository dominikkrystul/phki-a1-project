import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { Reveal } from '../components/Reveal';
import { useStaticFrame } from '../components/FrameContext';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { createFinalTimeline } from '../animations/final';

export type Decision = 'Approve deployment' | 'Request more information' | null;

function FinalStatement() {
  const root = useRef<HTMLHeadingElement>(null);
  const staticFrame = useStaticFrame();
  const reduce = useReducedMotion();

  useLayoutEffect(() => {
    if (staticFrame || !root.current) return;
    const context = gsap.context(() => {
      const sequence = createFinalTimeline(root.current!);
      if (reduce) sequence.progress(1, true).pause();
      else sequence.eventCallback('onComplete', () => sequence.pause()).play(0);
    }, root);
    return () => context.revert();
  }, [staticFrame, reduce]);

  return (
    <h1 ref={root} className="final-statement">
      <span className="final-lead">AI can write the code.</span>
      <span className="final-blue">But can you trust it?</span>
    </h1>
  );
}

function FinalScene({ step }: { step: number }) {
  return (
    <section className="final scene-content">
      {step < 2 ? (
        <h1 className="decision-title"><Reveal text="Would you still deploy it?" /></h1>
      ) : (
        <FinalStatement />
      )}
    </section>
  );
}

export function Scene({ scene, step }: { scene: number; step: number }) {
  switch (scene) {
    case 0: return null;
    case 1: return null;
    case 2: return null;
    case 3: return null;
    case 4: return null;
    case 5: return null;
    case 6: return null;
    default: return <FinalScene step={step} />;
  }
}
