import gsap from 'gsap';

export const securityDuration = 11.8;

// One playhead leaves the interface, finds the record and holds the discovery.
export function createSecurityTimeline(scope: HTMLElement) {
  const select = gsap.utils.selector(scope);
  const tl = gsap.timeline({ paused: true, defaults: { ease: 'power2.inOut' } });
  tl.set(select('.journey-camera'), { xPercent: 0, y: 0, z: 0, rotationY: 0, scale: 1 })
    .set(select('.interface-shell'), { xPercent: 0, yPercent: 0, z: 0, rotationX: 0, rotationY: 0, scale: 1, opacity: 1 })
    .set(select('.data-surface-near'), { xPercent: 8, yPercent: 3, z: -260, rotationY: -12, opacity: 0 })
    .set(select('.data-surface-side'), { xPercent: 16, yPercent: 6, z: -490, rotationY: -12, opacity: 0 })
    .set(select('.database-world'), { xPercent: 28, yPercent: 6, z: -720, rotationY: -15, scale: 0.94, opacity: 0 })
    .set(select('.journey-darkness'), { opacity: 0 })
    .set(select('.journey-name'), { opacity: 1, yPercent: 0, color: '#171719' })
    .set(select('.journey-conclusion'), { opacity: 0, yPercent: 35 })
    .set(select('.mask-explanation, .record-selection, .password-emphasis, .database-vignette'), { opacity: 0 })
    .set(select('.database-table-wrap'), { clipPath: 'inset(0 100% 0 0)' })
    .set(select('.database-heading, .database-disclosure, .users-table th, .users-table td:not(.stored-password)'), { opacity: 1 })
    .set(select('.password-mask'), { opacity: 1 })
    .set(select('.password-plain'), { opacity: 0 })
    .set(select('.password-stroke'), { scaleX: 0 })
    .addLabel('surface', 0)
    // Keep the entire familiar browser in frame; every surface recedes first.
    .to(select('.interface-shell'), { xPercent: -4, yPercent: 2, z: -180, rotationX: 10, rotationY: -12, duration: 1.5 }, 'surface')
    .to(select('.journey-name'), { yPercent: -30, opacity: 0, duration: 0.65 }, 0.65)
    .to(select('.journey-darkness'), { opacity: 1, duration: 2.2 }, 0.8)
    .addLabel('behind', 1.5)
    .to(select('.journey-camera'), { xPercent: 4, rotationY: 3, duration: 2.5 }, 'behind')
    .to(select('.interface-shell'), { xPercent: -94, yPercent: -5, z: -420, rotationY: -15, rotationX: 12, duration: 3 }, 'behind')
    .to(select('.data-surface-near'), { opacity: 0.85, duration: 0.65 }, 1.5)
    .to(select('.data-surface-side'), { opacity: 0.65, duration: 0.8 }, 1.85)
    .to(select('.data-surface-near'), { xPercent: -68, z: -320, rotationY: -15, duration: 3.3 }, 1.7)
    .to(select('.data-surface-side'), { xPercent: -35, z: -430, rotationY: -10, duration: 3.4 }, 2.1)
    .to(select('.interface-shell'), { opacity: 0, duration: 0.8 }, 3.8)
    .addLabel('database', 4)
    .to(select('.database-world'), { opacity: 1, duration: 0.9 }, 'database')
    .to(select('.database-world'), { xPercent: 0, yPercent: 0, z: 0, rotationY: 0, scale: 1, duration: 2.5 }, 'database')
    .to(select('.journey-camera'), { xPercent: 0, rotationY: 0, duration: 2.5 }, 'database')
    .to(select('.database-table-wrap'), { clipPath: 'inset(0 0% 0 0)', duration: 1.3 }, 4.65)
    .to(select('.data-surface'), { xPercent: -90, opacity: 0, duration: 1.5, stagger: 0.15 }, 4.8)
    .addLabel('record', 6.5)
    .to(select('.record-selection'), { opacity: 1, duration: 0.7 }, 'record')
    .to(select('.database-world'), { scale: 1.06, yPercent: 4, duration: 1.5 }, 'record')
    .to(select('.database-heading, .database-disclosure'), { opacity: 0.6, duration: 0.9 }, 'record')
    .to(select('.mask-explanation'), { opacity: 1, duration: 0.6 }, 7.2)
    .addLabel('password', 8)
    .to(select('.users-table th:not(:last-child), .users-table td:not(.stored-password)'), { opacity: 0.55, duration: 0.55 }, 'password')
    // A still beat, then remove only the display mask. No decryption metaphor.
    .to(select('.password-mask'), { opacity: 0, duration: 0.3 }, 8.85)
    .to(select('.password-plain'), { opacity: 1, duration: 0.45 }, 8.85)
    .to(select('.password-emphasis'), { opacity: 1, duration: 0.45 }, 9.15)
    .to(select('.password-stroke'), { scaleX: 1, duration: 0.45 }, 9.3)
    .addLabel('realization', 10)
    .to(select('.database-vignette'), { opacity: 1, duration: 0.9 }, 'realization')
    .to(select('.journey-conclusion'), { yPercent: 0, opacity: 1, duration: 1.1, ease: 'power3.out' }, 10.4)
    .set(select('.journey-conclusion'), { opacity: 1 }, securityDuration)
    .addLabel('statement', securityDuration);
  return tl;
}
