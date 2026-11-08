import { ArrowLeft, ArrowRight, Maximize, Minimize, Pause, Play, RotateCcw, Settings2, X } from 'lucide-react';
import { clockText, isAutomaticScene, locate, scenes, sceneStart, totalSteps } from '../navigation';
import type { Decision } from '../scenes/Scenes';

export function PresenterDock({ visible, cursor, seconds, running, fullscreen, decision, onMove, onScene, onTimer, onRestart, onFullscreen, onHelp, onHide, onDecision, onFocus, onBlur, cameraPaused, onCameraPause, cinematicPlaying }: {
  visible: boolean;
  cameraPaused: boolean;
  cinematicPlaying: boolean;
  onCameraPause: () => void;
  cursor: number;
  seconds: number;
  running: boolean;
  fullscreen: boolean;
  decision: Decision;
  onMove: (delta: number) => void;
  onScene: (cursor: number) => void;
  onTimer: () => void;
  onRestart: () => void;
  onFullscreen: () => void;
  onHelp: () => void;
  onHide: () => void;
  onDecision: (decision: Decision) => void;
  onFocus: () => void;
  onBlur: () => void;
}) {
  const { scene, step } = locate(cursor);

  return (
    <div
      className={`presenter-dock ${visible ? 'dock-visible' : ''}`}
      data-presenter-dock
      role="region"
      aria-label="Presenter controls"
      aria-hidden={!visible}
      inert={!visible}
      onFocus={onFocus}
      onBlur={event => {
        if (!event.currentTarget.contains(event.relatedTarget)) onBlur();
      }}
    >
      <button aria-label="Previous step" onClick={() => onMove(-1)} disabled={cursor === 0}><ArrowLeft size={17} /></button>
      <span className="dock-position">{scene + 1}.{step + 1}</span>
      <button aria-label="Next step" onClick={() => onMove(1)} disabled={cursor === totalSteps - 1 || cinematicPlaying}><ArrowRight size={17} /></button>
      <nav aria-label="Scenes">
        {scenes.map((entry, index) => (
          <button
            key={entry.title}
            aria-label={`Scene ${index + 1}: ${entry.title}`}
            aria-current={scene === index ? 'step' : undefined}
            title={`${entry.title} · ${entry.timing}`}
            onClick={() => onScene(sceneStart(index))}
          >{index + 1}</button>
        ))}
      </nav>
      <select aria-label="Audience decision" value={decision ?? ''} onChange={event => onDecision(event.target.value ? event.target.value as Decision : null)}>
        <option value="">Audience decision</option>
        <option>Approve deployment</option>
        <option>Request more information</option>
      </select>
      {isAutomaticScene(scene) && <button aria-label={cameraPaused ? 'Resume scene animation' : 'Pause scene animation'} title="Pause camera (P)" onClick={onCameraPause}>{cameraPaused ? <Play size={14} /> : <Pause size={14} />}</button>}
      <div className="dock-clock">
        <button aria-label={running ? 'Pause timer' : 'Start timer'} onClick={onTimer}>{running ? <Pause size={14} /> : <Play size={14} />}</button>
        <span aria-label="Elapsed time">{clockText(seconds)}</span>
      </div>
      <button aria-label="Restart presentation and timer" title="Restart (R)" onClick={onRestart}><RotateCcw size={16} /></button>
      <button aria-label={fullscreen ? 'Exit fullscreen' : 'Enter fullscreen'} title="Fullscreen (F)" onClick={onFullscreen}>{fullscreen ? <Minimize size={16} /> : <Maximize size={16} />}</button>
      <button id="keyboard-help" aria-label="Keyboard help" title="Help (?)" onClick={onHelp}><Settings2 size={16} /></button>
      <button aria-label="Hide presenter controls" title="Hide (H)" onClick={onHide}><X size={15} /></button>
    </div>
  );
}
