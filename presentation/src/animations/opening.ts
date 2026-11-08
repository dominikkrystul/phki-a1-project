import gsap from 'gsap';
import type { PortalView } from '../components/Portal';

export const openingIntroDuration = 3.6;
export const openingResearchDuration = 2.2;
export const websiteDuration = 10.8;

export function createOpeningTimeline(scope: HTMLElement, step: number) {
  const select = gsap.utils.selector(scope);
  const tl = gsap.timeline({ paused: true, defaults: { ease: 'power2.inOut' } });
  tl.set(select('.opening-browser-camera'), { opacity: 0 })
    .set(select('.opening-decision'), { opacity: 0 })
    .set(select('.opening-safety-mask'), { x: 0, y: 0, scale: 1, transformOrigin: 'top left' })
    .set(select('.opening-research'), { opacity: 0, y: 16 });

  if (step === 0) {
    tl.set(select('.opening-statement'), { x: 450, y: 314, scale: 1.025, opacity: 0 })
      .set(select('.opening-safety'), { y: 135, opacity: 0 })
      .addLabel('introduction', 0)
      .to(select('.opening-statement'), { y: 300, scale: 1, opacity: 1, duration: 1, ease: 'power3.out' }, 0.5)
      .to(select('.opening-statement'), { x: 110, y: 90, scale: 0.42, duration: 1.2, ease: 'power3.inOut' }, 1.9)
      .to(select('.opening-safety'), { y: 0, opacity: 1, duration: 1.05, ease: 'power3.out' }, 2.35)
      .addLabel('hold', openingIntroDuration)
      .set(select('.opening-safety'), { opacity: 1 }, 'hold');
  } else {
    // Start from checkpoint 2.1's held pose, including direct and backward entry.
    tl.set(select('.opening-statement'), { x: 110, y: 90, scale: 0.42, opacity: 1 })
      .set(select('.opening-safety'), { y: 0, opacity: 1 })
      .addLabel('research', 0)
      .to(select('.opening-statement'), { y: 74, scale: 0.3, duration: 1.5 }, 'research')
      .to(select('.opening-safety-mask'), { x: -150, y: -160, scale: 0.43, duration: 1.5 }, 'research')
      .to(select('.opening-research'), { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, 0.65)
      .addLabel('hold', openingResearchDuration)
      .set(select('.opening-research'), { opacity: 1 }, 'hold');
  }
  return tl;
}

export function createWebsiteTimeline(scope: HTMLElement, onViewChange: (view: PortalView) => void) {
  const select = gsap.utils.selector(scope);
  const tl = gsap.timeline({ paused: true, defaults: { ease: 'power2.inOut' } });
  tl.set(select('.opening-browser-camera'), { x: 87, y: 123, scale: 0.85, rotationX: 6, rotationY: -8, opacity: 0 })
    .set(select('.opening-decision'), { y: 110, opacity: 0 })
    .addLabel('website', 0)
    .to(select('.opening-browser-camera'), { opacity: 1, duration: 0.7 }, 'website')
    // Preserve the original website choreography relative to its browser entrance.
    .to(select('.opening-browser-camera'), { x: -114 / 1.06, y: -170 / 1.06, scale: 1.26 / 1.06, rotationX: 0, rotationY: 0, duration: 1.6, ease: 'power3.inOut' }, 'website')
    .call(() => onViewChange('login'), [], 3.5)
    .call(() => onViewChange('dashboard'), [], 6.1)
    .to(select('.opening-browser-camera'), { x: 0, y: 0, scale: 1, rotationX: 0, rotationY: 0, duration: 1.3, ease: 'power3.inOut' }, 8.3)
    .to(select('.opening-decision'), { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' }, 8.8)
    .addLabel('hold', websiteDuration)
    .set(select('.opening-decision'), { opacity: 1 }, 'hold');
  return tl;
}
