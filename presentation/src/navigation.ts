export const scenes = [
  { title: 'Introduction', steps: 1, exportStep: 0, timing: '0:00–0:10' },
  { title: 'The Digital Project', steps: 2, exportStep: 1, timing: '0:10–0:35' },
  { title: 'The Deployment Decision', steps: 1, exportStep: 0, timing: '0:35–1:10' },
  { title: 'Beyond the Interface', steps: 1, exportStep: 0, timing: '1:10–2:05' },
  { title: 'Three Weeks Later', steps: 1, exportStep: 0, timing: '2:05–2:33' },
  { title: 'Who Could Have Stopped It?', steps: 1, exportStep: 0, timing: '2:33–3:35' },
  { title: 'Who did what?', steps: 1, exportStep: 0, timing: '3:35–4:40' },
  { title: 'The Final Decision', steps: 3, exportStep: 2, timing: '4:40–5:45' },
] as const;

// Automatic refers to animation inside the selected checkpoint.
export const isAutomaticScene = (scene: number) => scene === 1 || scene === 2 || scene === 3 || scene === 4 || scene === 5 || scene === 6;

export const totalSteps = scenes.reduce((sum, scene) => sum + scene.steps, 0);
export const sceneStart = (scene: number) => scenes.slice(0, scene).reduce((sum, entry) => sum + entry.steps, 0);
export function locate(cursor: number): { scene: number; step: number } {
  let remaining = Math.min(totalSteps - 1, Math.max(0, Math.floor(cursor)));
  for (let scene = 0; scene < scenes.length; scene++) {
    if (remaining < scenes[scene].steps) return { scene, step: remaining };
    remaining -= scenes[scene].steps;
  }
  return { scene: scenes.length - 1, step: scenes[scenes.length - 1].steps - 1 };
}
export const move = (cursor: number, delta: number) => Math.min(totalSteps - 1, Math.max(0, cursor + delta));
export const clockText = (seconds: number) => `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
export function timerWarning(seconds: number) {
  if (seconds >= 360) return '6:00 · Time limit';
  if (seconds >= 345) return '15 seconds to the limit';
  if (seconds >= 300) return '5:00 · Move to your conclusion';
  return '';
}

export type NavigationState = { cursor: number; run: number; finished: boolean; paused: boolean };

export function advanceNavigation(value: NavigationState, delta: number): NavigationState {
  if (delta > 0 && isAutomaticScene(locate(value.cursor).scene) && !value.finished) return value;
  const nextCursor = move(value.cursor, delta);
  if (nextCursor === value.cursor) return value;
  return {
    cursor: nextCursor,
    run: value.run + 1,
    finished: delta < 0 || !isAutomaticScene(locate(nextCursor).scene),
    paused: false,
  };
}

export function completeAnimation(value: NavigationState, run: number): NavigationState {
  if (value.run !== run) return value;
  return { ...value, finished: true, paused: false };
}
