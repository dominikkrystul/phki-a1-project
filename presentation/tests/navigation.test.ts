import assert from 'node:assert/strict';
import test from 'node:test';
import {
  advanceNavigation,
  clockText,
  isAutomaticScene,
  locate,
  move,
  timerWarning,
  totalSteps,
} from '../src/navigation.ts';

test('navigation stays within the presentation bounds', () => {
  assert.equal(move(0, -1), 0);
  assert.equal(move(totalSteps - 1, 1), totalSteps - 1);
  assert.deepEqual(locate(0), { scene: 0, step: 0 });
});

test('automatic scenes wait for their animation before advancing', () => {
  const state = { cursor: 1, run: 0, finished: false, paused: false };
  assert.deepEqual(advanceNavigation(state, 1), state);
  assert.equal(advanceNavigation({ ...state, finished: true }, 1).cursor, 2);
  assert.equal(isAutomaticScene(1), true);
});

test('timer labels use the presentation thresholds', () => {
  assert.equal(clockText(65), '1:05');
  assert.equal(timerWarning(300), '5:00 · Move to your conclusion');
  assert.equal(timerWarning(345), '15 seconds to the limit');
  assert.equal(timerWarning(360), '6:00 · Time limit');
});
