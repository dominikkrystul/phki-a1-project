import gsap from 'gsap';

export const responsibilityDuration = 10.8;

export function createResponsibilityTimeline(scope: HTMLElement) {
  const select = gsap.utils.selector(scope);
  const source = scope.querySelector<HTMLElement>('.consequences-password')!;
  const token = scope.querySelector<HTMLElement>('.reconstruction-token')!;
  const stage = scope.closest<HTMLElement>('.stage')!;
  const sourceRect = source.getBoundingClientRect();
  const tokenRect = token.getBoundingClientRect();
  const stageScale = stage.getBoundingClientRect().width / stage.offsetWidth;
  const evidenceX = (sourceRect.left - tokenRect.left) / stageScale;
  const evidenceY = (sourceRect.top - tokenRect.top) / stageScale;
  const evidenceScaleX = sourceRect.width / tokenRect.width;
  const evidenceScaleY = sourceRect.height / tokenRect.height;
  const tl = gsap.timeline({ paused: true, defaults: { ease: 'power2.inOut' } });

  // The exposed value becomes the code's string literal, with no duplicate token.
  tl.set(select('.consequences-handoff'), { xPercent: 0, yPercent: 0, scale: 1, opacity: 1 })
    .set(select('.reconstruction-camera'), { x: 0, y: 0, scale: 1, rotationX: 0, rotationY: 0 })
    .set(select('.illustrative-assignment'), { x: 0, y: 0, z: 0, scale: 1, rotationY: 0 })
    .set(token, { x: evidenceX, y: evidenceY, scaleX: evidenceScaleX, scaleY: evidenceScaleY, transformOrigin: 'top left' })
    .set(select('.assignment-context, .editor-surface, .assignment-focus, .reconstruction-light, .reflection-shade'), { opacity: 0 })
    .set(select('.generation-station'), { x: 0, y: 0, z: -20, scale: 1, rotationY: 0 })
    .set(select('.generation-bed, .intervention-agent'), { opacity: 0 })
    .set(select('.review-station'), { x: 80, y: 75, z: -25, rotationY: -10, opacity: 0 })
    .set(select('.review-frame'), { scaleX: 0.96, scaleY: 0.94, transformOrigin: 'left center' })
    .set(select('.review-mark'), { opacity: 0, scaleY: 0.4, transformOrigin: 'center' })
    .set(select('.intervention-developer p'), { opacity: 0, y: 8 })
    .set(select('.release-gate'), { z: 80, y: 15, rotationY: -10, opacity: 0 })
    .set(select('.release-boundary'), { scaleY: 0.8, transformOrigin: 'center' })
    .set(select('.intervention-organization, .release-remit, .release-status'), { opacity: 0 })
    .set(select('.reconstruction-question'), { y: 18, opacity: 0 })

    .addLabel('evidence', 0)
    .to(token, { scaleX: evidenceScaleX * 1.04, scaleY: evidenceScaleY * 1.04, duration: 0.6 }, 'evidence')
    .to(select('.consequences-handoff'), { scale: 1.025, xPercent: -1, opacity: 0.45, duration: 0.7 }, 'evidence')
    .to(select('.consequences-handoff'), { opacity: 0, duration: 0.75 }, 0.7)
    .to(token, { x: 0, y: 0, scaleX: 1, scaleY: 1, duration: 1.15, ease: 'power3.inOut' }, 0.6)
    .to(select('.reconstruction-light'), { opacity: 1, duration: 1.1 }, 0.65)

    .addLabel('generation', 1.5)
    // The surface assembles around the evidence before the camera settles square.
    .to(select('.illustrative-assignment'), { rotationY: 10, duration: 0.8 }, 0.95)
    .to(select('.editor-surface'), { opacity: 1, duration: 0.75 }, 1.05)
    .to(select('.illustrative-assignment'), { rotationY: 0, duration: 1.1 }, 1.8)
    .to(select('.assignment-context'), { opacity: 1, duration: 0.5, stagger: 0.055 }, 'generation')
    .to(select('.intervention-agent'), { opacity: 1, duration: 0.45 }, 1.75)
    .to(select('.generation-bed'), { opacity: 0.5, duration: 0.5 }, 1.9)
    .to(select('.assignment-focus'), { opacity: 0.65, duration: 0.5 }, 2.25)

    .addLabel('review', 3.5)
    .to(select('.reconstruction-camera'), { x: -25, y: -10, scale: 0.98, rotationY: 5, duration: 1.5 }, 'review')
    .to(select('.illustrative-assignment'), { x: 80, y: 75, rotationY: -10, duration: 1.5 }, 'review')
    .to(select('.generation-station'), { x: -140, y: -75, z: -200, rotationY: 10, scale: 0.94, duration: 1.5 }, 'review')
    .to(select('.review-station'), { opacity: 1, duration: 0.65 }, 3.85)
    .to(select('.review-frame'), { scaleX: 1, scaleY: 1, duration: 0.8 }, 3.85)
    .to(select('.assignment-surrounding'), { opacity: 0.38, duration: 0.5 }, 4.25)
    .to(select('.assignment-focus'), { opacity: 1, duration: 0.45 }, 4.25)
    .to(select('.review-mark'), { opacity: 1, scaleY: 1, duration: 0.45 }, 4.55)
    .to(select('.intervention-developer p'), { opacity: 1, y: 0, duration: 0.4 }, 5.15)
    .addLabel('review-hold', 5.6)
    // A 400ms still beat gives the question room before release control appears.

    .addLabel('release', 6)
    .to(select('.reconstruction-camera'), { x: -30, y: 8, scale: 0.92, rotationY: -3, rotationX: 2, duration: 1.65 }, 'release')
    .to(select('.illustrative-assignment'), { x: 90, y: 120, scale: 0.8, rotationY: -3, duration: 1.65 }, 'release')
    .to(select('.review-station'), { x: 55, y: 75, z: -80, rotationY: -6, duration: 1.65 }, 'release')
    .to(select('.release-gate'), { opacity: 1, y: 0, duration: 0.8 }, 6.1)
    .to(select('.release-boundary'), { scaleY: 1, duration: 1 }, 6.1)
    .to(select('.intervention-organization'), { opacity: 1, duration: 0.45 }, 6.55)
    .to(select('.release-remit, .release-status'), { opacity: 1, duration: 0.4, stagger: 0.12 }, 7.05)
    // The shared code stops short of the boundary. The release decision stays open.
    .addLabel('release-hold', 7.8)

    .addLabel('reflection', 8.5)
    .to(select('.reconstruction-camera'), { x: 0, y: 30, scale: 0.88, rotationY: -4, rotationX: 3, duration: 1.8 }, 'reflection')
    .to(select('.generation-bed'), { opacity: 0.75, duration: 0.9 }, 'reflection')
    .to(select('.reflection-shade'), { opacity: 0.22, duration: 1.1 }, 8.8)
    .to(select('.reconstruction-question'), { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, 9.6)
    .addLabel('question', responsibilityDuration)
    .set(select('.reconstruction-question'), { opacity: 1 }, 'question');
  return tl;
}
