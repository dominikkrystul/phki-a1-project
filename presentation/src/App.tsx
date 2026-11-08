import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { MotionConfig } from 'motion/react';
import { X } from 'lucide-react';
import { PresenterDock } from './components/PresenterDock';
import { Stage } from './components/Stage';
import { PrintDeck } from './components/PrintDeck';
import type { Decision } from './scenes/Scenes';
import { advanceNavigation, completeAnimation, isAutomaticScene, locate, scenes, sceneStart, timerWarning } from './navigation';
import { useClock } from './hooks/useClock';
import { useReducedMotion } from './hooks/useReducedMotion';

function Presentation({ initialScene, capture }: { initialScene: number; capture: boolean }) {
  const [navigation, setNavigation] = useState({
    cursor: sceneStart(initialScene), run: 0, finished: !isAutomaticScene(initialScene), paused: false,
  });
  const { cursor, paused: cameraPaused } = navigation;
  const [decision, setDecision] = useState<Decision>(null);
  const [pinned, setPinned] = useState(false);
  const [nearBottom, setNearBottom] = useState(false);
  const [dockFocused, setDockFocused] = useState(false);
  const [help, setHelp] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [message, setMessage] = useState('');
  const [scale, setScale] = useState(1);
  const clock = useClock();
  const { scene, step } = locate(cursor);
  const controlsVisible = pinned || nearBottom || dockFocused || help;

  useLayoutEffect(() => {
    const resize = () => setScale(Math.min(window.innerWidth / 1600, window.innerHeight / 900));
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  useEffect(() => {
    let idleTimer: number;
    const pointerMoved = (event: PointerEvent) => {
      window.clearTimeout(idleTimer);
      const target = event.target as HTMLElement;
      const withinDock = Boolean(target.closest('[data-presenter-dock]'));
      if (event.clientY >= window.innerHeight - 56 || withinDock) {
        setNearBottom(true);
        idleTimer = window.setTimeout(() => setNearBottom(false), 2200);
      } else {
        setNearBottom(false);
      }
    };
    window.addEventListener('pointermove', pointerMoved);
    return () => {
      window.clearTimeout(idleTimer);
      window.removeEventListener('pointermove', pointerMoved);
    };
  }, []);

  async function toggleFullscreen() {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else if (document.documentElement.requestFullscreen) await document.documentElement.requestFullscreen();
      else setMessage('Use your browser’s fullscreen command.');
    } catch {
      setMessage('Fullscreen was blocked. Use your browser’s fullscreen command.');
    }
  }

  useEffect(() => {
    const change = () => setFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', change);
    return () => document.removeEventListener('fullscreenchange', change);
  }, []);

  const completeCinematic = useCallback((run: number) => {
    setNavigation(value => completeAnimation(value, run));
  }, []);

  function jumpTo(nextCursor: number) {
    setNavigation(value => ({
      ...value,
      cursor: nextCursor,
      run: value.run + 1,
      finished: !isAutomaticScene(locate(nextCursor).scene),
      paused: false,
    }));
  }

  function advance(delta: number) {
    setNavigation(value => advanceNavigation(value, delta));
  }

  function toggleCamera() {
    setNavigation(value => ({ ...value, paused: !value.paused }));
  }

  function restart() {
    setNavigation(value => ({ cursor: 0, run: value.run + 1, finished: true, paused: false }));
    setDecision(null);
    clock.reset();
    setMessage('');
  }

  function hideControls() {
    if (document.activeElement instanceof HTMLElement && document.activeElement.closest('[data-presenter-dock]')) {
      document.activeElement.blur();
    }
    setPinned(false);
    setNearBottom(false);
    setDockFocused(false);
  }

  function closeHelp() {
    setHelp(false);
    setPinned(true);
    window.requestAnimationFrame(() => document.getElementById('keyboard-help')?.focus());
  }

  useEffect(() => {
    const keydown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (event.altKey || event.metaKey || event.ctrlKey || target.matches('input, textarea, select, [contenteditable="true"]')) return;
      if (event.key === 'Escape') {
        if (help) closeHelp();
        else hideControls();
        if (document.fullscreenElement) void document.exitFullscreen().catch(() => setMessage('Use your browser’s fullscreen command to exit.'));
        return;
      }
      if (help || event.repeat) return;
      if (event.code === 'Space' && target.closest('button, a')) return;
      if (event.key === 'ArrowRight' || event.code === 'Space') {
        event.preventDefault();
        advance(1);
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        advance(-1);
      } else if (event.key.toLowerCase() === 'f') void toggleFullscreen();
      else if (event.key.toLowerCase() === 'h') {
        if (controlsVisible) hideControls();
        else setPinned(true);
      } else if (event.key.toLowerCase() === 'r') restart();
      else if (event.key.toLowerCase() === 'p' && isAutomaticScene(scene)) toggleCamera();
      else if (event.key.toLowerCase() === 't') clock.toggle();
      else if (event.key.toLowerCase() === 'a') setDecision('Approve deployment');
      else if (event.key.toLowerCase() === 'm') setDecision('Request more information');
      else if (event.key === '?') setHelp(true);
      else if (/^[1-9]$/.test(event.key) && Number(event.key) <= scenes.length) {
        jumpTo(sceneStart(Number(event.key) - 1));
      }
    };
    window.addEventListener('keydown', keydown);
    return () => window.removeEventListener('keydown', keydown);
  });

  useEffect(() => {
    if (help) document.getElementById('close-help')?.focus();
  }, [help]);

  return (
    <div className={`presentation-shell ${capture ? 'capture-mode' : ''}`}>
      <div className="stage-fit" style={{ width: 1600 * scale, height: 900 * scale }}>
        <Stage scene={scene} step={step} scale={scale} cameraPaused={cameraPaused}
          cinematicRun={navigation.run} cinematicFinished={navigation.finished}
          onCinematicComplete={completeCinematic} />
      </div>
      <div className="sr-only" aria-live="polite">Scene {scene + 1}, {scenes[scene].title}, step {step + 1} of {scenes[scene].steps}.</div>
      {!capture && (
        <>
          <button className="dock-access" aria-label="Show presenter controls" onFocus={() => setPinned(true)} onClick={() => setPinned(true)}>Controls</button>
          <PresenterDock
            visible={controlsVisible} cursor={cursor} seconds={clock.seconds}
            running={clock.running} fullscreen={fullscreen} decision={decision}
            onMove={advance} onScene={jumpTo}
            cinematicPlaying={isAutomaticScene(scene) && !navigation.finished}
            cameraPaused={cameraPaused} onCameraPause={toggleCamera} onTimer={clock.toggle}
            onRestart={restart} onFullscreen={() => void toggleFullscreen()}
            onHelp={() => setHelp(true)} onHide={hideControls}
            onDecision={setDecision} onFocus={() => setDockFocused(true)}
            onBlur={() => setDockFocused(false)}
          />
          <div className={`timer-warning ${clock.seconds >= 345 ? 'urgent' : ''}`} role="status" aria-live="polite">{timerWarning(clock.seconds)}</div>
          {message && <div className="system-message" role="status">{message}<button aria-label="Dismiss message" onClick={() => setMessage('')}><X size={16} /></button></div>}
          {help && (
            <div className="help-backdrop" onClick={closeHelp}>
              <section role="dialog" aria-modal="true" aria-labelledby="help-title" className="help-panel" onClick={event => event.stopPropagation()} onKeyDown={event => {
                if (event.key === 'Tab') {
                  event.preventDefault();
                  document.getElementById('close-help')?.focus();
                }
              }}>
                <button id="close-help" aria-label="Close help" onClick={closeHelp}><X size={20} /></button>
                <h2 id="help-title">Presenter controls</h2>
                <dl>
                  <dt>→ / Space</dt><dd>Next checkpoint</dd><dt>←</dt><dd>Previous checkpoint</dd>
                  <dt>1–8</dt><dd>Jump to scene</dd><dt>F / Escape</dt><dd>Enter / exit fullscreen</dd>
                  <dt>P</dt><dd>Pause / resume scene animation</dd><dt>T</dt><dd>Start / pause timer</dd><dt>R</dt><dd>Restart and reset timer</dd>
                  <dt>H</dt><dd>Pin / hide dock</dd><dt>A / M</dt><dd>Approve / request information</dd>
                </dl>
                <p>Move near the bottom edge to reveal the dock. Start the timer when you begin speaking. Target 5:45.</p>
              </section>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default function App() {
  const reduce = useReducedMotion();
  const parameters = new URLSearchParams(window.location.search);
  const requestedScene = Number(parameters.get('scene'));
  const validScene = Number.isInteger(requestedScene) && requestedScene >= 1 && requestedScene <= scenes.length;

  if (parameters.get('print') === '1') {
    return <PrintDeck selectedScene={validScene ? requestedScene - 1 : undefined} />;
  }

  return (
    <MotionConfig reducedMotion={reduce ? 'always' : 'never'}>
      <Presentation initialScene={validScene ? requestedScene - 1 : 0} capture={parameters.get('capture') === '1'} />
    </MotionConfig>
  );
}
