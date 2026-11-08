import gsap from 'gsap';

export const consequencesDuration = 14.6;

export function createConsequencesTimeline(scope: HTMLElement) {
  const select = gsap.utils.selector(scope);
  const tl = gsap.timeline({ paused: true, defaults: { ease: 'power2.inOut' } });

  tl.set(select('.database-handoff'), { opacity: 1, scale: 1, xPercent: 0, yPercent: 0 })
    .set(select('.consequences-handoff'), { opacity: 1, scale: 1, xPercent: 0, yPercent: 0 })
    .set(select('.consequences-atmosphere, .consequences-disclosure'), { opacity: 0 })
    .set(select('.consequences-time'), { opacity: 1, y: 0, scale: 1 })
    .set(select('.consequences-time p, .consequences-time h1'), { opacity: 0, y: 20 })
    .set(select('.consequences-world'), { x: 0, y: 0, scale: 1, rotationY: 0 })
    .set(select('.consequences-evidence'), { opacity: 0, x: -60, y: 0, z: -180, scale: 0.94, rotationY: -10 })
    .set(select('.consequences-record-shell'), { opacity: 1, x: 0, y: 0, z: 0, scale: 1, rotationY: 0 })
    .set(select('.consequences-record-context'), { opacity: 1 })
    .set(select('.consequences-password'), { x: 0, y: 0, scale: 1 })
    .set(select('.consequences-copy-edge'), { x: 0, y: 0, opacity: 0 })
    .set(select('.consequences-password-well'), { opacity: 0 })
    .set(select('.consequences-exposure-status'), { opacity: 0, y: 10 })
    .set(select('.consequences-person'), { opacity: 0, x: 0, y: 18, scale: 1 })
    .set(select('.consequences-user-message'), { opacity: 0, y: 16 })
    .set(select('.consequences-reuse-link'), { opacity: 0, scaleX: 0, transformOrigin: 'left' })
    .set(select('.consequences-reuse-boundary'), { opacity: 0, y: 10 })
    .set(select('.consequences-company'), { opacity: 0, y: 20, rotationY: -8 })
    .set(select('.consequences-company-impact'), { opacity: 0, y: 12 })
    .set(select('.consequences-question'), { opacity: 0, y: 20 })

    .addLabel('time-passes', 0)
    .to(select('.database-handoff'), { scale: 0.86, yPercent: -6, opacity: 0, duration: 1.8 }, 'time-passes')
    .to(select('.consequences-atmosphere'), { opacity: 1, duration: 1.2 }, 0.3)
    .to(select('.consequences-disclosure'), { opacity: 1, duration: 0.5 }, 0.25)
    .to(select('.consequences-time p'), { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 0.35)
    .to(select('.consequences-time h1'), { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out' }, 1.2)

    .addLabel('exposure', 3)
    .to(select('.consequences-time'), { opacity: 0, y: -24, scale: 0.96, duration: 0.8 }, 'exposure')
    .to(select('.consequences-evidence'), { opacity: 1, x: 0, z: 0, scale: 1, rotationY: 0, duration: 1.6 }, 'exposure')
    .to(select('.consequences-exposure-status'), { opacity: 1, y: 0, duration: 0.5 }, 4.15)
    .to(select('.consequences-world'), { x: -75, y: -30, scale: 1.06, rotationY: 3, duration: 1.4 }, 4.45)
    .to(select('.consequences-record-context'), { opacity: 0.38, duration: 0.45 }, 4.8)
    .to(select('.consequences-password-well'), { opacity: 1, duration: 0.45 }, 4.95)
    // A second edge identifies an exposed copy, without depicting a breach technique.
    .to(select('.consequences-copy-edge'), { x: -18, y: 14, opacity: 0.55, duration: 0.65 }, 5.1)
    .addLabel('exposure-hold', 5.9)

    .addLabel('user', 6.5)
    .to(select('.consequences-world'), { x: 0, y: 0, scale: 1, rotationY: 0, duration: 1.5 }, 'user')
    .to(select('.consequences-record-shell'), { x: 200, y: -50, z: -220, scale: 0.82, rotationY: 8, opacity: 0.14, duration: 1.5 }, 'user')
    // One password moves out of the copied row and stays beside the same identity.
    .to(select('.consequences-password'), { x: -590, y: 100, scale: 1.12, duration: 1.5 }, 'user')
    .to(select('.consequences-exposure-status'), { opacity: 0, duration: 0.45 }, 'user')
    .to(select('.consequences-person'), { opacity: 1, y: 0, duration: 0.7 }, 6.8)
    .to(select('.consequences-user-message'), { opacity: 1, y: 0, duration: 0.65 }, 7.3)
    .to(select('.consequences-reuse-link'), { opacity: 0.6, scaleX: 1, duration: 0.8 }, 8)
    .to(select('.consequences-reuse-boundary'), { opacity: 1, y: 0, duration: 0.5 }, 8.35)

    .addLabel('company', 9.5)
    .to(select('.consequences-world'), { scale: 0.94, rotationY: -4, duration: 1.6 }, 'company')
    .to(select('.consequences-reuse-boundary'), { opacity: 0, y: -10, duration: 0.45 }, 'company')
    .to(select('.consequences-reuse-link'), { scaleX: 1.5, opacity: 0.45, duration: 1.2 }, 'company')
    .to(select('.consequences-company'), { opacity: 1, y: 0, rotationY: 0, duration: 1.3 }, 'company')
    .to(select('.consequences-company-impact'), { opacity: 1, y: 0, duration: 0.65 }, 10.45)

    .addLabel('reflection', 12.5)
    .to(select('.consequences-world'), { x: 0, y: 25, scale: 0.88, rotationY: 0, duration: 1.8 }, 'reflection')
    .to(select('.consequences-question'), { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out' }, 13)
    .addLabel('hold', consequencesDuration)
    .set(select('.consequences-question'), { opacity: 1 }, 'hold');

  return tl;
}
