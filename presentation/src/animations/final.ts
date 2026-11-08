import gsap from 'gsap';

export const finalDuration = 3.6;

export function createFinalTimeline(scope: HTMLElement) {
  const select = gsap.utils.selector(scope);
  const tl = gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } });

  tl.set(select('.final-lead'), { opacity: 0, y: 18 })
    .set(select('.final-blue'), { opacity: 0, y: 22, scale: 0.985, transformOrigin: 'left center' })
    .addLabel('statement', 0)
    .to(select('.final-lead'), { opacity: 1, y: 0, duration: 0.95 }, 0.2)
    .addLabel('question', 1.6)
    .to(select('.final-blue'), { opacity: 1, y: 0, scale: 1, duration: 1.2 }, 'question')
    .addLabel('hold', finalDuration)
    .set(select('.final-blue'), { opacity: 1 }, 'hold');

  return tl;
}
