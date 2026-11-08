import { useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Globe2 } from 'lucide-react';
import gsap from 'gsap';
import demo from '../../../data/demo-database.json';
import { travel } from '../animations/motion';
import { createSecurityTimeline, securityDuration } from '../animations/security';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useStaticFrame } from './FrameContext';
import { Portal } from './Portal';
import type { PortalView } from './Portal';
import { OpeningStory } from './OpeningStory';
import { createOpeningTimeline, createWebsiteTimeline } from '../animations/opening';
import { ResponsibilityReconstruction } from './ResponsibilityReconstruction';
import { createResponsibilityTimeline } from '../animations/responsibility';
import { ConsequencesScene } from './ConsequencesScene';
import { createConsequencesTimeline } from '../animations/consequences';
import { ContributionScene } from './ContributionScene';
import { createContributionTimeline } from '../animations/contribution';

const decisionPose = 'translate(208px, 250px) scale(1.06) rotateX(0deg) rotateY(0deg)';

function browserPose(scene: number, step: number) {
  if (scene === 1 || scene === 2) return decisionPose;
  if (scene === 3 || scene === 4 || scene === 5) return decisionPose;
  if (scene === 7) {
    if (step === 2) return 'translate(208px, 1100px) scale(0.88) rotateX(6deg) rotateY(0deg)';
    return step === 0 ? decisionPose : 'translate(245px, 280px) scale(0.99) rotateX(0deg) rotateY(0deg)';
  }
  return 'translate(-600px, 440px) scale(0.72) rotateX(0deg) rotateY(18deg)';
}

export function BrowserStage({ scene, step, cameraPaused = false, cinematicRun = 0, cinematicFinished = true, onCinematicComplete }: {
  scene: number;
  step: number;
  cameraPaused?: boolean;
  cinematicRun?: number;
  cinematicFinished?: boolean;
  onCinematicComplete?: (run: number) => void;
}) {
  const root = useRef<HTMLDivElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const scrub = useRef<gsap.core.Tween | null>(null);
  const consequencesTimeline = useRef<gsap.core.Timeline | null>(null);
  const contributionTimeline = useRef<gsap.core.Timeline | null>(null);
  const reconstruction = useRef<gsap.core.Timeline | null>(null);
  const opening = useRef<gsap.core.Timeline | null>(null);
  const [openingView, setOpeningView] = useState<PortalView>('register');
  const reduce = useReducedMotion();
  const staticFrame = useStaticFrame();
  const projectOpening = scene === 1;
  const decision = scene === 2;
  const openingActive = projectOpening || decision;
  const security = scene === 3;
  const consequences = scene === 4;
  const responsibility = scene === 5;
  const contribution = scene === 6;
  // Keep the discovered record available across both cinematic handoffs.
  const phase = security || consequences || responsibility ? 5 : 0;
  const present = decision || security || consequences || responsibility || (scene === 7 && step < 2);
  const view: PortalView = decision && !staticFrame ? openingView : 'dashboard';
  const target = browserPose(scene, step);
  const record = demo[0];
  const revealed = consequences || responsibility || (security && cinematicFinished);

  useLayoutEffect(() => {
    if (staticFrame || !root.current) return;
    const context = gsap.context(() => {
      timeline.current = createSecurityTimeline(root.current!);
    }, root);
    return () => {
      scrub.current?.kill();
      context.revert();
      timeline.current = null;
    };
  }, [staticFrame]);

  useLayoutEffect(() => {
    const sequence = timeline.current;
    if (!sequence) return;
    scrub.current?.kill();
    scrub.current = null;
    if (!security) {
      sequence.pause(phase === 5 ? securityDuration : 0);
      return;
    }
    if (reduce || cinematicFinished) {
      sequence.pause(securityDuration);
      if (!cinematicFinished) onCinematicComplete?.(cinematicRun);
      return;
    }
    sequence.pause(0);
    scrub.current = sequence.tweenTo(securityDuration, {
      duration: securityDuration,
      ease: 'none',
      onComplete: () => onCinematicComplete?.(cinematicRun),
    });
    return () => {
      scrub.current?.kill();
      scrub.current = null;
    };
  }, [phase, reduce, security, cinematicRun, cinematicFinished, onCinematicComplete]);

  useLayoutEffect(() => {
    if ((!consequences && !responsibility) || staticFrame || !root.current) return;
    const context = gsap.context(() => {
      const sequence = createConsequencesTimeline(root.current!);
      consequencesTimeline.current = sequence;
      if (responsibility || reduce || cinematicFinished) sequence.progress(1, true).pause();
      else sequence.eventCallback('onComplete', () => onCinematicComplete?.(cinematicRun)).play(0);
    }, root);
    if (consequences && reduce && !cinematicFinished) onCinematicComplete?.(cinematicRun);
    return () => {
      context.revert();
      consequencesTimeline.current = null;
    };
  }, [consequences, responsibility, staticFrame, reduce, cinematicRun, cinematicFinished, onCinematicComplete]);

  useLayoutEffect(() => {
    if (!responsibility || staticFrame || !root.current) return;
    const context = gsap.context(() => {
      const sequence = createResponsibilityTimeline(root.current!);
      reconstruction.current = sequence;
      if (reduce || cinematicFinished) sequence.progress(1).pause();
      else sequence.eventCallback('onComplete', () => onCinematicComplete?.(cinematicRun)).play(0);
    }, root);
    if (reduce && !cinematicFinished) onCinematicComplete?.(cinematicRun);
    return () => {
      context.revert();
      reconstruction.current = null;
    };
  }, [responsibility, staticFrame, reduce, cinematicRun, cinematicFinished, onCinematicComplete]);

  useLayoutEffect(() => {
    if (!contribution || staticFrame || !root.current) return;
    const context = gsap.context(() => {
      const sequence = createContributionTimeline(root.current!);
      contributionTimeline.current = sequence;
      if (reduce || cinematicFinished) sequence.progress(1, true).pause();
      else sequence.eventCallback('onComplete', () => onCinematicComplete?.(cinematicRun)).play(0);
    }, root);
    if (reduce && !cinematicFinished) onCinematicComplete?.(cinematicRun);
    return () => {
      context.revert();
      contributionTimeline.current = null;
    };
  }, [contribution, staticFrame, reduce, cinematicRun, cinematicFinished, onCinematicComplete]);

  useLayoutEffect(() => {
    if (!openingActive || staticFrame || !root.current) return;
    const holdCheckpoint = reduce || cinematicFinished;
    setOpeningView(decision && holdCheckpoint ? 'dashboard' : 'register');
    const context = gsap.context(() => {
      const sequence = decision
        ? createWebsiteTimeline(root.current!, setOpeningView)
        : createOpeningTimeline(root.current!, step);
      opening.current = sequence;
      if (holdCheckpoint) sequence.progress(1, true).pause();
      else sequence.eventCallback('onComplete', () => onCinematicComplete?.(cinematicRun)).play(0);
    }, root);
    if (reduce && !cinematicFinished) onCinematicComplete?.(cinematicRun);
    return () => {
      context.revert();
      opening.current = null;
    };
  }, [openingActive, decision, step, staticFrame, reduce, cinematicRun, cinematicFinished, onCinematicComplete]);

  useLayoutEffect(() => {
    scrub.current?.paused(cameraPaused);
    consequencesTimeline.current?.paused(cameraPaused || cinematicFinished || reduce || responsibility);
    reconstruction.current?.paused(cameraPaused || cinematicFinished);
    contributionTimeline.current?.paused(cameraPaused || cinematicFinished || reduce);
    opening.current?.paused(cameraPaused || cinematicFinished || reduce);
  }, [cameraPaused, security, consequences, responsibility, contribution, openingActive, decision, cinematicRun, cinematicFinished, reduce]);

  return (
    <div ref={root} className={`journey-root ${responsibility ? 'responsibility-active' : ''} ${openingActive ? 'opening-active' : ''}`} data-phase={phase} data-camera-paused={cameraPaused}>
      <motion.div className="journey-backdrop" initial={false} animate={{ opacity: security || consequences || responsibility ? 1 : 0 }} transition={{ duration: staticFrame || reduce ? 0 : 0.3 }}>
        <div className="journey-darkness" />
      </motion.div>
      <motion.div
        className="browser-anchor"
        aria-hidden={!present || consequences || responsibility}
        inert={!present || consequences || responsibility}
        initial={staticFrame ? false : { opacity: 0, transform: target }}
        animate={{ opacity: present ? 1 : 0, transform: target }}
        transition={staticFrame || reduce || consequences || responsibility || openingActive ? { duration: 0 } : { ...travel, opacity: { duration: present ? 0.6 : 0.26, delay: scene === 1 ? 0.35 : 0 } }}
      >
        <div className="opening-browser-camera">
          <div className="database-handoff">
            <div className="journey-perspective">
              <div className="journey-camera">
                <div className="data-surface data-surface-near" aria-hidden="true">
                  <span className="layer-caption">Application logic</span>
                  <span className="abstract-code">{'{ … }'}</span>
                  <div className="abstract-data-lines"><i/><i/><i/><i/><i/></div>
                  <span className="abstract-code">{'[ … ]'}</span>
                </div>
                <div className="data-surface data-surface-side" aria-hidden="true">
                  <span className="layer-caption">Stored data</span>
                  <div className="abstract-data-rows"><i/><i/><i/><i/><i/><i/></div>
                </div>
                <div className="interface-shell browser-object" aria-hidden={revealed} inert={revealed}>
                  <div className="browser-chrome">
                    <div className="window-dots"><i /><i /><i /></div>
                    <div className="browser-address"><Globe2 size={13} />Northline Studio</div>
                    <span className="chrome-spacer" />
                  </div>
                  <div className="browser-viewport"><Portal view={view} /></div>
                </div>
                <section className="database-world" aria-label="Simulated users table" aria-hidden={phase === 0} inert={phase === 0}>
                  <div className="database-vignette" aria-hidden="true" />
                  <header className="database-heading"><span>Northline Studio</span><strong>users</strong><span>1 fictional record</span></header>
                  <div className="database-table-wrap">
                    <div className="record-selection" aria-hidden="true" />
                    <table className="users-table">
                      <colgroup><col className="id-column"/><col className="name-column"/><col className="email-column"/><col className="password-column"/></colgroup>
                      <thead><tr><th scope="col">id</th><th scope="col">name</th><th scope="col">email</th><th scope="col">password</th></tr></thead>
                      <tbody><tr><td>{record.id}</td><td>{record.name}</td><td>{record.email}</td><td className="stored-password">
                        <span className="password-emphasis" aria-hidden="true" />
                        <span className="password-value" aria-label={revealed ? record.password : 'Stored password visually masked'}>
                          <span className="password-mask" aria-hidden="true">••••••••••••</span>
                          <span className="password-plain" aria-hidden="true">{phase === 5 ? record.password : ''}</span>
                          <span className="password-stroke" />
                        </span>
                      </td></tr></tbody>
                    </table>
                  </div>
                  <p className="mask-explanation">Display mask only · stored value is plaintext</p>
                  <footer className="database-disclosure">Simulated data · fixed fictional account</footer>
                </section>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      <OpeningStory active={openingActive} step={step} decision={decision} />
      <ConsequencesScene active={consequences} handoff={responsibility} />
      <ResponsibilityReconstruction active={responsibility} password={record.password} />
      <ContributionScene active={contribution} />
      <motion.div className="journey-copy" aria-hidden={!security} initial={false} animate={{ opacity: security ? 1 : 0 }} transition={{ duration: staticFrame || reduce || openingActive ? 0 : 0.26 }}>
        <div className="journey-title-mask">
          <h1 className="journey-name" aria-hidden={revealed}>It works.</h1>
          <h1 className="journey-conclusion" aria-hidden={!revealed}>The security didn't.</h1>
        </div>
      </motion.div>
    </div>
  );
}
