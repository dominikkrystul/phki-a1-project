import { MotionConfig } from 'motion/react';
import { scenes } from '../navigation';
import { StaticFrameContext } from './FrameContext';
import { Stage } from './Stage';

export function PrintDeck({ selectedScene }: { selectedScene?: number }) {
  const frames = scenes.map((scene, index) => ({ scene: index, step: scene.exportStep }));
  const selected = selectedScene === undefined ? frames : [frames[selectedScene]];

  return (
    <StaticFrameContext.Provider value={true}>
      <MotionConfig reducedMotion="always" transition={{ duration: 0 }}>
        <div className="print-deck" data-export-pages={selected.length}>
          {selected.map(frame => (
            <article className="print-page" key={frame.scene}>
              <Stage scene={frame.scene} step={frame.step} />
            </article>
          ))}
        </div>
      </MotionConfig>
    </StaticFrameContext.Provider>
  );
}
