import gsap from 'gsap';

export const contributionDuration = 12.6;

export function createContributionTimeline(scope: HTMLElement) {
  const select = gsap.utils.selector(scope);
  const tl = gsap.timeline({ paused: true, defaults: { ease: 'power2.inOut' } });

  tl.set(select('.contribution-backdrop'), { opacity: 0 })
    .set(select('.contribution-title'), { opacity: 0, y: 12 })
    .set(select('.contribution-camera'), { x: 360, y: 0, scale: 1.02, rotationY: 2 })
    .set(select('.contribution-ai'), { opacity: 0, x: 0, y: 24, z: -140, scale: 0.94, rotationY: -7 })
    .set(select('.contribution-me'), { opacity: 0, x: 0, y: 30, z: -180, scale: 0.94, rotationY: -6 })
    .set(select('.contribution-role'), { opacity: 0, y: 10 })
    .set(select('.contribution-login'), { opacity: 0, y: 10, scale: 0.98 })
    .set(select('.contribution-login-header, .contribution-login-field, .contribution-login-submit'), { opacity: 0, y: 8 })
    .set(select('.contribution-ai-labels li'), { opacity: 0, y: 8 })
    .set(select('.contribution-note'), { opacity: 0, y: 14 })
    .set(select('.contribution-observation'), { opacity: 0, y: 10 })
    .set(select('.contribution-annotation-stroke'), { scaleX: 0, transformOrigin: 'left' })

    .addLabel('ai-workspace', 0)
    .to(select('.contribution-backdrop'), { opacity: 1, duration: 0.8 }, 'ai-workspace')
    .to(select('.contribution-title'), { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 0.2)
    .to(select('.contribution-camera'), { scale: 1.03, rotationY: 0, duration: 1.8 }, 0.2)
    .to(select('.contribution-ai'), { opacity: 1, y: 0, z: 0, scale: 1, rotationY: 0, duration: 1.5 }, 0.15)
    .to(select('.contribution-ai-role'), { opacity: 1, y: 0, duration: 0.5 }, 0.4)
    .to(select('.contribution-login'), { opacity: 1, y: 0, scale: 1, duration: 0.6 }, 0.65)
    .to(select('.contribution-login-header'), { opacity: 1, y: 0, duration: 0.4 }, 1.1)
    .to(select('.contribution-login-field'), { opacity: 1, y: 0, duration: 0.4, stagger: 0.16 }, 1.5)
    .to(select('.contribution-login-submit'), { opacity: 1, y: 0, duration: 0.45 }, 2)
    .to(select('.contribution-ai-labels li'), { opacity: 1, y: 0, duration: 0.4, stagger: 0.12 }, 2.35)

    .addLabel('camera-shift', 3)
    // Both surfaces inhabit one space. The implementation recedes as decisions approach.
    .to(select('.contribution-camera'), { x: -10, scale: 0.97, rotationY: -2, duration: 2 }, 'camera-shift')
    .to(select('.contribution-ai'), { x: -5, y: 6, z: -30, scale: 0.97, rotationY: 4, duration: 2 }, 'camera-shift')
    .to(select('.contribution-me'), { y: 0, z: 0, scale: 1, rotationY: -2, duration: 1.8 }, 3.4)
    .to(select('.contribution-me'), { opacity: 1, duration: 1.2 }, 4.35)
    .to(select('.contribution-me-role'), { opacity: 1, y: 0, duration: 0.5 }, 4.35)

    .addLabel('my-contribution', 6)
    .to(select('.contribution-research'), { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, 'my-contribution')
    .to(select('.contribution-scenario'), { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, 6.55)
    .to(select('.contribution-critical'), { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, 7.1)
    .to(select('.contribution-observation'), { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' }, 7.65)
    .to(select('.contribution-annotation-stroke'), { scaleX: 1, duration: 0.55 }, 8.25)

    .addLabel('combined', 9)
    .to(select('.contribution-camera'), { x: 0, scale: 0.94, rotationY: 0, duration: 2.6 }, 'combined')
    .to(select('.contribution-ai'), { x: 0, y: 0, z: 0, scale: 1, rotationY: 0, duration: 2.2 }, 'combined')
    .to(select('.contribution-me'), { z: 0, scale: 1, rotationY: 0, duration: 2.2 }, 'combined')
    .addLabel('settled', 11.8)
    .addLabel('hold', contributionDuration)
    .set(select('.contribution-title'), { opacity: 1 }, 'hold');

  return tl;
}
