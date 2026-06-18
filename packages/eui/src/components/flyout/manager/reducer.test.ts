/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at the election, the Elastic License 2.0 or the Server Side Public License, v 1.
 */

import { flyoutManagerReducer, initialState } from './reducer';
import {
  addFlyout,
  closeFlyout,
  closeAllFlyouts,
  setActiveFlyout,
  setFlyoutWidth,
  setLayoutMode,
  setActivityStage,
  goBack,
  goToFlyout,
  addUnmanagedFlyout,
  closeUnmanagedFlyout,
} from './actions';
import {
  LAYOUT_MODE_SIDE_BY_SIDE,
  LAYOUT_MODE_STACKED,
  LEVEL_MAIN,
  LEVEL_CHILD,
  STAGE_OPENING,
  STAGE_ACTIVE,
  STAGE_INACTIVE,
  STAGE_BACKGROUNDING,
  STAGE_BACKGROUNDED,
  STAGE_RETURNING,
  STAGE_CLOSING,
} from './const';

describe('flyoutManagerReducer', () => {
  describe('initial state', () => {
    it('should return initial state', () => {
      expect(flyoutManagerReducer(undefined, {} as any)).toEqual(initialState);
    });

    it('should have correct initial values', () => {
      expect(initialState).toEqual({
        sessions: [],
        flyouts: [],
        layoutMode: LAYOUT_MODE_SIDE_BY_SIDE,
        pushPadding: { left: 0, right: 0 },
        unmanagedFlyouts: [],
        currentZIndex: 0,
      });
    });
  });

  describe('ACTION_ADD', () => {
    it('should add a main flyout and create a new session', () => {
      const action = addFlyout('main-1', 'main', LEVEL_MAIN, 'm');
      const newState = flyoutManagerReducer(initialState, action);

      expect(newState.flyouts).toHaveLength(1);
      expect(newState.flyouts[0]).toEqual({
        flyoutId: 'main-1',
        level: LEVEL_MAIN,
        size: 'm',
        activityStage: STAGE_OPENING,
      });

      expect(newState.sessions).toHaveLength(1);
      expect(newState.sessions[0]).toMatchInlineSnapshot(`
        {
          "childFlyoutId": null,
          "childHistory": [],
          "historyKey": Symbol(),
          "iconType": undefined,
          "mainFlyoutId": "main-1",
          "title": "main",
          "zIndex": 0,
        }
      `);
    });

    it('should store iconType on session when addFlyout is called with iconType', () => {
      const action = addFlyout(
        'main-1',
        'Session A',
        LEVEL_MAIN,
        'm',
        undefined,
        'faceHappy'
      );
      const newState = flyoutManagerReducer(initialState, action);

      expect(newState.sessions).toHaveLength(1);
      expect(newState.sessions[0].iconType).toBe('faceHappy');
      expect(newState.sessions[0].title).toBe('Session A');
    });

    it('should add a child flyout to the most recent session', () => {
      // First add a main flyout
      let state = flyoutManagerReducer(
        initialState,
        addFlyout('main-1', 'main', LEVEL_MAIN)
      );

      // Then add a child flyout
      const action = addFlyout('child-1', 'child', LEVEL_CHILD);
      state = flyoutManagerReducer(state, action);

      expect(state.flyouts).toHaveLength(2);
      expect(state.sessions).toHaveLength(1);
      expect(state.sessions[0].childFlyoutId).toBe('child-1');
    });

    it('should ignore duplicate flyout IDs', () => {
      const action1 = addFlyout('main-1', 'main', LEVEL_MAIN);
      let state = flyoutManagerReducer(initialState, action1);

      const action2 = addFlyout('main-1', 'main', LEVEL_MAIN);
      state = flyoutManagerReducer(state, action2);

      expect(state.flyouts).toHaveLength(1);
      expect(state.sessions).toHaveLength(1);
    });

    it('should not add child flyout when no session exists', () => {
      const action = addFlyout('child-1', 'child', LEVEL_CHILD);
      const newState = flyoutManagerReducer(initialState, action);

      expect(newState).toEqual(initialState);
    });

    it('should push current child to history and append new child when adding second child (do not remove previous)', () => {
      let state = flyoutManagerReducer(
        initialState,
        addFlyout('main-1', 'Main', LEVEL_MAIN)
      );
      state = flyoutManagerReducer(
        state,
        addFlyout('child-1', 'Child 1', LEVEL_CHILD)
      );
      state = flyoutManagerReducer(
        state,
        addFlyout('child-2', 'Child 2', LEVEL_CHILD)
      );

      expect(state.flyouts).toHaveLength(3); // main + child-1 + child-2 (previous child not removed)
      expect(state.sessions).toHaveLength(1);
      expect(state.sessions[0].childFlyoutId).toBe('child-2');
      expect(state.sessions[0].childTitle).toBe('Child 2');
      expect(state.sessions[0].childHistory).toHaveLength(1);
      expect(state.sessions[0].childHistory[0]).toEqual({
        flyoutId: 'child-1',
        title: 'Child 1',
        iconType: undefined,
      });
    });

    it('should treat addFlyout child as idempotent when childFlyoutId already matches (e.g. after goBack)', () => {
      let state = flyoutManagerReducer(
        initialState,
        addFlyout('main-1', 'Main', LEVEL_MAIN)
      );
      state = flyoutManagerReducer(
        state,
        addFlyout('child-1', 'Child 1', LEVEL_CHILD)
      );
      state = flyoutManagerReducer(
        state,
        addFlyout('child-2', 'Child 2', LEVEL_CHILD)
      );
      // Go back: pop child history, current becomes child-1, child-2 removed from flyouts
      state = flyoutManagerReducer(state, goBack());
      const flyoutCountAfterGoBack = state.flyouts.length;

      // Re-register child-1 (idempotent: already in flyouts and session.childFlyoutId === child-1)
      state = flyoutManagerReducer(
        state,
        addFlyout(
          'child-1',
          'Child 1 Updated',
          LEVEL_CHILD,
          undefined,
          undefined,
          'starFilled'
        )
      );

      expect(state.flyouts).toHaveLength(flyoutCountAfterGoBack); // no duplicate flyout
      expect(state.sessions[0].childFlyoutId).toBe('child-1');
      expect(state.sessions[0].childTitle).toBe('Child 1 Updated');
      expect(state.sessions[0].childIconType).toBe('starFilled');
      expect(state.sessions[0].childHistory).toHaveLength(0); // popped by goBack
    });

    it('should handle multiple sessions correctly', () => {
      // Add first main flyout
      let state = flyoutManagerReducer(
        initialState,
        addFlyout('main-1', 'main', LEVEL_MAIN)
      );

      // Add child to first session
      state = flyoutManagerReducer(
        state,
        addFlyout('child-1', 'child', LEVEL_CHILD)
      );

      // Add second main flyout (should create new session)
      state = flyoutManagerReducer(
        state,
        addFlyout('main-2', 'main', LEVEL_MAIN)
      );

      expect(state.sessions).toHaveLength(2);
      expect(state.sessions[0]).toMatchInlineSnapshot(`
        {
          "childFlyoutId": "child-1",
          "childHistory": [],
          "childIconType": undefined,
          "childTitle": "child",
          "historyKey": Symbol(),
          "iconType": undefined,
          "mainFlyoutId": "main-1",
          "title": "main",
          "zIndex": 0,
        }
      `);
      expect(state.sessions[1]).toMatchInlineSnapshot(`
        {
          "childFlyoutId": null,
          "childHistory": [],
          "historyKey": Symbol(),
          "iconType": undefined,
          "mainFlyoutId": "main-2",
          "title": "main",
          "zIndex": 3,
        }
      `);
    });

    it('should store historyKey on session when addFlyout main is called with historyKey', () => {
      const key = Symbol('shared');
      const action = addFlyout('main-1', 'Session A', LEVEL_MAIN, 'm', key);
      const newState = flyoutManagerReducer(initialState, action);

      expect(newState.sessions).toHaveLength(1);
      expect(newState.sessions[0].historyKey).toBe(key);
    });
  });

  describe('ACTION_CLOSE', () => {
    it('should close a child flyout and clear child reference', () => {
      // Setup: add main flyout with child
      let state = flyoutManagerReducer(
        initialState,
        addFlyout('main-1', 'main', LEVEL_MAIN)
      );
      state = flyoutManagerReducer(
        state,
        addFlyout('child-1', 'child', LEVEL_CHILD)
      );

      // Close child flyout
      const action = closeFlyout('child-1');
      state = flyoutManagerReducer(state, action);

      expect(state.flyouts).toHaveLength(1);
      expect(state.flyouts[0].flyoutId).toBe('main-1');
      expect(state.sessions[0].childFlyoutId).toBe(null);
    });

    it('should handle closing non-existent flyout', () => {
      const action = closeFlyout('non-existent');
      const newState = flyoutManagerReducer(initialState, action);

      expect(newState).toEqual(initialState);
    });

    it('should handle closing child flyout when no sessions exist', () => {
      const action = closeFlyout('child-1');
      const newState = flyoutManagerReducer(initialState, action);

      expect(newState).toEqual(initialState);
    });

    it('should close all children of session when closing a child (clear childHistory, remove all child flyouts)', () => {
      let state = flyoutManagerReducer(
        initialState,
        addFlyout('main-1', 'Main', LEVEL_MAIN)
      );
      state = flyoutManagerReducer(
        state,
        addFlyout('child-1', 'Child 1', LEVEL_CHILD)
      );
      state = flyoutManagerReducer(
        state,
        addFlyout('child-2', 'Child 2', LEVEL_CHILD)
      );
      expect(state.flyouts).toHaveLength(3);
      expect(state.sessions[0].childFlyoutId).toBe('child-2');
      expect(state.sessions[0].childHistory).toHaveLength(1);

      state = flyoutManagerReducer(state, closeFlyout('child-2'));

      expect(state.sessions[0].childFlyoutId).toBe(null);
      expect(state.sessions[0].childHistory).toHaveLength(0);
      expect(state.flyouts).toHaveLength(1);
      expect(state.flyouts[0].flyoutId).toBe('main-1');
    });

    it('should clear child state of the session that owns the closed child when closing a child in a non-current session', () => {
      // Session 0: main-1 + child-1. Session 1: main-2 + child-2 (current).
      let state = flyoutManagerReducer(
        initialState,
        addFlyout('main-1', 'Main 1', LEVEL_MAIN)
      );
      state = flyoutManagerReducer(
        state,
        addFlyout('child-1', 'Child 1', LEVEL_CHILD)
      );
      state = flyoutManagerReducer(
        state,
        addFlyout('main-2', 'Main 2', LEVEL_MAIN)
      );
      state = flyoutManagerReducer(
        state,
        addFlyout('child-2', 'Child 2', LEVEL_CHILD)
      );
      expect(state.sessions).toHaveLength(2);
      expect(state.sessions[0].childFlyoutId).toBe('child-1');
      expect(state.sessions[1].childFlyoutId).toBe('child-2');
      expect(state.flyouts.map((f) => f.flyoutId)).toEqual([
        'main-1',
        'child-1',
        'main-2',
        'child-2',
      ]);

      // Close child-1 (belongs to session 0, which is not the current session)
      state = flyoutManagerReducer(state, closeFlyout('child-1'));

      // Session 0's child state must be cleared so navigating back stays consistent
      expect(state.sessions[0].childFlyoutId).toBe(null);
      expect(state.sessions[0].childHistory).toHaveLength(0);
      // Session 1 unchanged
      expect(state.sessions[1].childFlyoutId).toBe('child-2');
      // child-1 removed from flyouts; main-1, main-2, child-2 remain
      expect(state.flyouts.map((f) => f.flyoutId)).toEqual([
        'main-1',
        'main-2',
        'child-2',
      ]);
    });
  });

  describe('ACTION_CLOSE_ALL', () => {
    it('should close flyout and child when closing a single session', () => {
      // Setup: add main flyout with child
      let state = flyoutManagerReducer(
        initialState,
        addFlyout('main-1', 'main', LEVEL_MAIN)
      );
      state = flyoutManagerReducer(
        state,
        addFlyout('child-1', 'child', LEVEL_CHILD)
      );

      // Close main flyout
      const action = closeAllFlyouts();
      state = flyoutManagerReducer(state, action);

      // When main flyout is closed, all related flyouts should be removed
      expect(state.flyouts).toHaveLength(0);
      expect(state.sessions).toHaveLength(0);
    });

    it('should close all sessions and preserve unmanaged flyouts', () => {
      const historyKey = Symbol();
      // Setup: add managed and unmanaged flyouts (same historyKey so closeAll closes both sessions)
      let state = flyoutManagerReducer(
        initialState,
        addFlyout('main-1', 'Main 1', LEVEL_MAIN, undefined, historyKey)
      );
      state = flyoutManagerReducer(
        state,
        addFlyout('main-2', 'Main 2', LEVEL_MAIN, undefined, historyKey)
      );
      state = flyoutManagerReducer(state, addUnmanagedFlyout('unmanaged-1'));

      expect(state.sessions).toHaveLength(2);
      expect(state.flyouts).toHaveLength(2);
      expect(state.unmanagedFlyouts).toHaveLength(1);

      // Close all flyouts (current history group = both sessions)
      const action = closeAllFlyouts();
      state = flyoutManagerReducer(state, action);

      // All managed flyouts and sessions should be removed
      expect(state.flyouts).toHaveLength(0);
      expect(state.sessions).toHaveLength(0);
      expect(state.unmanagedFlyouts).toHaveLength(1);
    });

    it('should close all sessions including child flyouts', () => {
      const historyKey = Symbol();
      // Setup: add sessions with children (same historyKey)
      let state = flyoutManagerReducer(
        initialState,
        addFlyout('main-1', 'Main 1', LEVEL_MAIN, undefined, historyKey)
      );
      state = flyoutManagerReducer(
        state,
        addFlyout('child-1', 'Child 1', LEVEL_CHILD)
      );
      state = flyoutManagerReducer(
        state,
        addFlyout('main-2', 'Main 2', LEVEL_MAIN, undefined, historyKey)
      );

      expect(state.sessions).toHaveLength(2);
      expect(state.flyouts).toHaveLength(3);

      // Close all flyouts (current group = both sessions)
      const action = closeAllFlyouts();
      state = flyoutManagerReducer(state, action);

      // All flyouts (main and child) should be removed
      expect(state.flyouts).toHaveLength(0);
      expect(state.sessions).toHaveLength(0);
    });

    it('should handle closing when no sessions exist', () => {
      const action = closeAllFlyouts();
      const newState = flyoutManagerReducer(initialState, action);

      // Should return same state (no-op)
      expect(newState).toEqual(initialState);
    });

    it('should close only current history group when multiple groups exist', () => {
      const keyA = Symbol();
      const keyB = Symbol();
      let state = flyoutManagerReducer(
        initialState,
        addFlyout('main-1', 'Session A', LEVEL_MAIN, undefined, keyA)
      );
      state = flyoutManagerReducer(
        state,
        addFlyout('main-2', 'Session B', LEVEL_MAIN, undefined, keyB)
      );
      state = flyoutManagerReducer(
        state,
        addFlyout('main-3', 'Session A2', LEVEL_MAIN, undefined, keyA)
      );

      expect(state.sessions).toHaveLength(3);

      // closeAllFlyouts from top (main-3, keyA) removes only sessions with keyA: main-3 and main-1
      state = flyoutManagerReducer(state, closeAllFlyouts());

      expect(state.sessions).toHaveLength(1);
      expect(state.sessions[0].mainFlyoutId).toBe('main-2');
      expect(state.flyouts).toHaveLength(1);
      expect(state.flyouts[0].flyoutId).toBe('main-2');
    });

    it('should reset currentZIndex value when all unmanaged and managed flyouts are closed', () => {
      const historyKey = Symbol();
      // Setup: add managed and unmanaged flyouts (same historyKey)
      let state = flyoutManagerReducer(
        initialState,
        addFlyout('main-1', 'Main 1', LEVEL_MAIN, undefined, historyKey)
      );
      state = flyoutManagerReducer(
        state,
        addFlyout('main-2', 'Main 2', LEVEL_MAIN, undefined, historyKey)
      );
      state = flyoutManagerReducer(state, addUnmanagedFlyout('unmanaged-1'));

      // currentZIndex should have incremented
      expect(state.currentZIndex).toEqual(8);

      // Close unmanaged flyout, currentZIndex should remain the same
      state = flyoutManagerReducer(state, closeUnmanagedFlyout('unmanaged-1'));
      expect(state.currentZIndex).toEqual(8);

      // Close all flyouts (both sessions in group), currentZIndex should reset to 0
      state = flyoutManagerReducer(state, closeAllFlyouts());
      expect(state.currentZIndex).toBe(0);
    });
  });

  describe('ACTION_SET_ACTIVE', () => {
    it('should set active child flyout for current session', () => {
      // Setup: add main flyout
      let state = flyoutManagerReducer(
        initialState,
        addFlyout('main-1', 'main', LEVEL_MAIN)
      );

      const action = setActiveFlyout('child-1');
      state = flyoutManagerReducer(state, action);

      expect(state.sessions[0].childFlyoutId).toBe('child-1');
    });

    it('should clear active child flyout when null is passed', () => {
      // Setup: add main flyout with child
      let state = flyoutManagerReducer(
        initialState,
        addFlyout('main-1', 'main', LEVEL_MAIN)
      );
      state = flyoutManagerReducer(
        state,
        addFlyout('child-1', 'child', LEVEL_CHILD)
      );

      const action = setActiveFlyout(null);
      state = flyoutManagerReducer(state, action);

      expect(state.sessions[0].childFlyoutId).toBe(null);
    });

    it('should do nothing when no sessions exist', () => {
      const action = setActiveFlyout('child-1');
      const newState = flyoutManagerReducer(initialState, action);

      expect(newState).toEqual(initialState);
    });
  });

  describe('ACTION_SET_WIDTH', () => {
    it('should update flyout width', () => {
      // Setup: add flyout
      let state = flyoutManagerReducer(
        initialState,
        addFlyout('main-1', 'main', LEVEL_MAIN)
      );

      const action = setFlyoutWidth('main-1', 400);
      state = flyoutManagerReducer(state, action);

      expect(state.flyouts[0].width).toBe(400);
    });

    it('should not affect other flyouts', () => {
      // Setup: add two flyouts
      let state = flyoutManagerReducer(
        initialState,
        addFlyout('main-1', 'main', LEVEL_MAIN)
      );
      state = flyoutManagerReducer(
        state,
        addFlyout('main-2', 'main', LEVEL_MAIN)
      );

      const action = setFlyoutWidth('main-1', 400);
      state = flyoutManagerReducer(state, action);

      expect(state.flyouts[0].width).toBe(400);
      expect(state.flyouts[1].width).toBeUndefined();
    });

    it('should handle non-existent flyout ID gracefully', () => {
      const action = setFlyoutWidth('non-existent', 400);
      const newState = flyoutManagerReducer(initialState, action);

      expect(newState).toEqual(initialState);
    });
  });

  describe('ACTION_SET_LAYOUT_MODE', () => {
    it('should update layout mode to stacked', () => {
      const action = setLayoutMode(LAYOUT_MODE_STACKED);
      const newState = flyoutManagerReducer(initialState, action);

      expect(newState.layoutMode).toBe(LAYOUT_MODE_STACKED);
    });

    it('should update layout mode to side-by-side', () => {
      // First change to stacked
      let state = flyoutManagerReducer(
        initialState,
        setLayoutMode(LAYOUT_MODE_STACKED)
      );

      // Then change back to side-by-side
      const action = setLayoutMode(LAYOUT_MODE_SIDE_BY_SIDE);
      state = flyoutManagerReducer(state, action);

      expect(state.layoutMode).toBe(LAYOUT_MODE_SIDE_BY_SIDE);
    });
  });

  describe('ACTION_SET_ACTIVITY_STAGE', () => {
    it('should update flyout activity stage', () => {
      // Setup: add flyout
      let state = flyoutManagerReducer(
        initialState,
        addFlyout('main-1', 'main', LEVEL_MAIN)
      );

      const action = setActivityStage('main-1', STAGE_ACTIVE);
      state = flyoutManagerReducer(state, action);

      expect(state.flyouts[0].activityStage).toBe(STAGE_ACTIVE);
    });

    it('should handle all activity stages', () => {
      // Setup: add flyout
      let state = flyoutManagerReducer(
        initialState,
        addFlyout('main-1', 'main', LEVEL_MAIN)
      );

      const stages = [
        STAGE_OPENING,
        STAGE_ACTIVE,
        STAGE_INACTIVE,
        STAGE_BACKGROUNDING,
        STAGE_BACKGROUNDED,
        STAGE_RETURNING,
        STAGE_CLOSING,
      ];

      stages.forEach((stage) => {
        const action = setActivityStage('main-1', stage as any);
        state = flyoutManagerReducer(state, action);
        expect(state.flyouts[0].activityStage).toBe(stage);
      });
    });

    it('should not affect other flyouts', () => {
      // Setup: add two flyouts
      let state = flyoutManagerReducer(
        initialState,
        addFlyout('main-1', 'main', LEVEL_MAIN)
      );
      state = flyoutManagerReducer(
        state,
        addFlyout('main-2', 'main', LEVEL_MAIN)
      );

      const action = setActivityStage('main-1', STAGE_ACTIVE);
      state = flyoutManagerReducer(state, action);

      expect(state.flyouts[0].activityStage).toBe(STAGE_ACTIVE);
      expect(state.flyouts[1].activityStage).toBe(STAGE_OPENING);
    });
  });

  describe('ACTION_GO_BACK', () => {
    it('should remove the current session and its flyouts', () => {
      const historyKey = Symbol();
      // Setup: create two sessions (same historyKey so goBack only removes one)
      let state = flyoutManagerReducer(
        initialState,
        addFlyout('main-1', 'Session A', LEVEL_MAIN, undefined, historyKey)
      );
      state = flyoutManagerReducer(
        state,
        addFlyout('main-2', 'Session B', LEVEL_MAIN, undefined, historyKey)
      );

      expect(state.sessions).toHaveLength(2);
      expect(state.flyouts).toHaveLength(2);

      // Go back (should remove Session B only, same group)
      const action = goBack();
      state = flyoutManagerReducer(state, action);

      expect(state.sessions).toHaveLength(1);
      expect(state.sessions[0].mainFlyoutId).toBe('main-1');
      expect(state.sessions[0].title).toBe('Session A');
      expect(state.flyouts).toHaveLength(1);
      expect(state.flyouts[0].flyoutId).toBe('main-1');
    });

    it('should remove current session with child flyout', () => {
      const historyKey = Symbol();
      // Setup: create session with child (same historyKey)
      let state = flyoutManagerReducer(
        initialState,
        addFlyout('main-1', 'Session A', LEVEL_MAIN, undefined, historyKey)
      );
      state = flyoutManagerReducer(
        state,
        addFlyout('main-2', 'Session B', LEVEL_MAIN, undefined, historyKey)
      );
      state = flyoutManagerReducer(
        state,
        addFlyout('child-2', 'Child B', LEVEL_CHILD)
      );

      expect(state.sessions).toHaveLength(2);
      expect(state.sessions[1].childFlyoutId).toBe('child-2');
      expect(state.flyouts).toHaveLength(3);

      // Go back (should remove Session B and its child only)
      const action = goBack();
      state = flyoutManagerReducer(state, action);

      expect(state.sessions).toHaveLength(1);
      expect(state.sessions[0].mainFlyoutId).toBe('main-1');
      expect(state.flyouts).toHaveLength(1);
      expect(state.flyouts[0].flyoutId).toBe('main-1');
    });

    it('should keep other groups and restore previous session in current group when going back', () => {
      const keyA = Symbol();
      const keyB = Symbol();
      let state = flyoutManagerReducer(
        initialState,
        addFlyout('main-1', 'Session A', LEVEL_MAIN, undefined, keyA)
      );
      state = flyoutManagerReducer(
        state,
        addFlyout('main-2', 'Session B', LEVEL_MAIN, undefined, keyB)
      );
      state = flyoutManagerReducer(
        state,
        addFlyout('main-3', 'Session A2', LEVEL_MAIN, undefined, keyA)
      );

      expect(state.sessions).toHaveLength(3);

      // goBack from main-3 (keyA): remove current session and bring prior keyA session to top.
      // main-2 (keyB) remains in state and is restored when keyA group closes.
      state = flyoutManagerReducer(state, goBack());

      expect(state.sessions).toHaveLength(2);
      expect(state.sessions.map((s) => s.mainFlyoutId)).toEqual([
        'main-2',
        'main-1',
      ]);
      expect(state.flyouts.map((f) => f.flyoutId)).toEqual([
        'main-1',
        'main-2',
      ]);
    });

    it('should do nothing when no sessions exist', () => {
      const action = goBack();
      const newState = flyoutManagerReducer(initialState, action);

      expect(newState).toEqual(initialState);
    });

    it('should pop child history first when current session has childHistory (remove current child from flyouts)', () => {
      let state = flyoutManagerReducer(
        initialState,
        addFlyout('main-1', 'Main', LEVEL_MAIN)
      );
      state = flyoutManagerReducer(
        state,
        addFlyout('child-1', 'Child 1', LEVEL_CHILD)
      );
      state = flyoutManagerReducer(
        state,
        addFlyout('child-2', 'Child 2', LEVEL_CHILD)
      );
      expect(state.sessions[0].childFlyoutId).toBe('child-2');
      expect(state.sessions[0].childHistory).toHaveLength(1);

      state = flyoutManagerReducer(state, goBack());

      expect(state.sessions).toHaveLength(1); // session not removed
      expect(state.sessions[0].childFlyoutId).toBe('child-1');
      expect(state.sessions[0].childHistory).toHaveLength(0);
      expect(state.flyouts.map((f) => f.flyoutId)).toEqual([
        'main-1',
        'child-1',
      ]); // child-2 removed
    });

    it('should remove the last session when only one exists', () => {
      // Setup: create single session
      let state = flyoutManagerReducer(
        initialState,
        addFlyout('main-1', 'Session A', LEVEL_MAIN)
      );

      expect(state.sessions).toHaveLength(1);
      expect(state.flyouts).toHaveLength(1);

      // Go back (should remove the only session)
      const action = goBack();
      state = flyoutManagerReducer(state, action);

      expect(state.sessions).toHaveLength(0);
      expect(state.flyouts).toHaveLength(0);
    });
  });

  describe('ACTION_GO_TO_FLYOUT', () => {
    it('should remove all sessions after the target session', () => {
      // Setup: create three sessions
      let state = flyoutManagerReducer(
        initialState,
        addFlyout('main-1', 'Session A', LEVEL_MAIN)
      );
      state = flyoutManagerReducer(
        state,
        addFlyout('main-2', 'Session B', LEVEL_MAIN)
      );
      state = flyoutManagerReducer(
        state,
        addFlyout('main-3', 'Session C', LEVEL_MAIN)
      );

      expect(state.sessions).toHaveLength(3);
      expect(state.flyouts).toHaveLength(3);

      // Navigate to Session A (should remove B and C)
      const action = goToFlyout('main-1');
      state = flyoutManagerReducer(state, action);

      expect(state.sessions).toHaveLength(1);
      expect(state.sessions[0].mainFlyoutId).toBe('main-1');
      expect(state.sessions[0].title).toBe('Session A');
      expect(state.flyouts).toHaveLength(1);
      expect(state.flyouts[0].flyoutId).toBe('main-1');
    });

    it('should remove sessions with child flyouts', () => {
      // Setup: create sessions with children
      let state = flyoutManagerReducer(
        initialState,
        addFlyout('main-1', 'Session A', LEVEL_MAIN)
      );
      state = flyoutManagerReducer(
        state,
        addFlyout('main-2', 'Session B', LEVEL_MAIN)
      );
      state = flyoutManagerReducer(
        state,
        addFlyout('child-2', 'Child B', LEVEL_CHILD)
      );
      state = flyoutManagerReducer(
        state,
        addFlyout('main-3', 'Session C', LEVEL_MAIN)
      );
      state = flyoutManagerReducer(
        state,
        addFlyout('child-3', 'Child C', LEVEL_CHILD)
      );

      expect(state.sessions).toHaveLength(3);
      expect(state.flyouts).toHaveLength(5);

      // Navigate to Session A (should remove B, child-2, C, child-3)
      const action = goToFlyout('main-1');
      state = flyoutManagerReducer(state, action);

      expect(state.sessions).toHaveLength(1);
      expect(state.sessions[0].mainFlyoutId).toBe('main-1');
      expect(state.flyouts).toHaveLength(1);
      expect(state.flyouts[0].flyoutId).toBe('main-1');
    });

    it('should handle navigating to middle session', () => {
      // Setup: create three sessions
      let state = flyoutManagerReducer(
        initialState,
        addFlyout('main-1', 'Session A', LEVEL_MAIN)
      );
      state = flyoutManagerReducer(
        state,
        addFlyout('main-2', 'Session B', LEVEL_MAIN)
      );
      state = flyoutManagerReducer(
        state,
        addFlyout('main-3', 'Session C', LEVEL_MAIN)
      );

      // Navigate to Session B (should remove only C)
      const action = goToFlyout('main-2');
      state = flyoutManagerReducer(state, action);

      expect(state.sessions).toHaveLength(2);
      expect(state.sessions[0].mainFlyoutId).toBe('main-1');
      expect(state.sessions[1].mainFlyoutId).toBe('main-2');
      expect(state.flyouts).toHaveLength(2);
      expect(state.flyouts.map((f) => f.flyoutId)).toEqual([
        'main-1',
        'main-2',
      ]);
    });

    it('should preserve intervening groups when navigating to prior session in current history group', () => {
      const keyA = Symbol();
      const keyB = Symbol();
      let state = flyoutManagerReducer(
        initialState,
        addFlyout('main-1', 'Session A1', LEVEL_MAIN, undefined, keyA)
      );
      state = flyoutManagerReducer(
        state,
        addFlyout('main-2', 'Session B1', LEVEL_MAIN, undefined, keyB)
      );
      state = flyoutManagerReducer(
        state,
        addFlyout('main-3', 'Session A2', LEVEL_MAIN, undefined, keyA)
      );

      expect(state.sessions.map((s) => s.mainFlyoutId)).toEqual([
        'main-1',
        'main-2',
        'main-3',
      ]);

      // Navigate from A2 to A1: remove newer same-group session(s) only and keep B1.
      state = flyoutManagerReducer(state, goToFlyout('main-1'));

      expect(state.sessions.map((s) => s.mainFlyoutId)).toEqual([
        'main-2',
        'main-1',
      ]);
      expect(state.flyouts.map((f) => f.flyoutId)).toEqual([
        'main-1',
        'main-2',
      ]);
    });

    it('should do nothing when target flyout does not exist', () => {
      // Setup: create session
      let state = flyoutManagerReducer(
        initialState,
        addFlyout('main-1', 'Session A', LEVEL_MAIN)
      );

      const originalState = { ...state };

      // Try to navigate to non-existent flyout
      const action = goToFlyout('non-existent');
      state = flyoutManagerReducer(state, action);

      expect(state).toEqual(originalState);
    });

    it('should do nothing when navigating to the current (last) session', () => {
      // Setup: create two sessions
      let state = flyoutManagerReducer(
        initialState,
        addFlyout('main-1', 'Session A', LEVEL_MAIN)
      );
      state = flyoutManagerReducer(
        state,
        addFlyout('main-2', 'Session B', LEVEL_MAIN)
      );

      // Navigate to the current session (should do nothing)
      const action = goToFlyout('main-2');
      const originalState = { ...state };
      state = flyoutManagerReducer(state, action);

      expect(state).toEqual(originalState);
    });

    it('should handle empty state gracefully', () => {
      const action = goToFlyout('main-1');
      const newState = flyoutManagerReducer(initialState, action);

      expect(newState).toEqual(initialState);
    });

    it('should navigate to child in current session history when level is "child"', () => {
      let state = flyoutManagerReducer(
        initialState,
        addFlyout('main-1', 'Main', LEVEL_MAIN)
      );
      state = flyoutManagerReducer(
        state,
        addFlyout('child-1', 'Child 1', LEVEL_CHILD)
      );
      state = flyoutManagerReducer(
        state,
        addFlyout('child-2', 'Child 2', LEVEL_CHILD)
      );
      state = flyoutManagerReducer(
        state,
        addFlyout('child-3', 'Child 3', LEVEL_CHILD)
      );
      expect(state.sessions[0].childFlyoutId).toBe('child-3');
      expect(state.sessions[0].childHistory).toHaveLength(2);

      state = flyoutManagerReducer(state, goToFlyout('child-1', 'child'));

      expect(state.sessions[0].childFlyoutId).toBe('child-1');
      expect(state.sessions[0].childHistory).toHaveLength(0); // popped to child-1
      expect(state.flyouts.map((f) => f.flyoutId)).toEqual([
        'main-1',
        'child-1',
      ]); // child-2, child-3 removed
    });
  });

  describe('ACTION_ADD_UNMANAGED', () => {
    it('should add an unmanaged flyout', () => {
      let state = flyoutManagerReducer(
        initialState,
        addUnmanagedFlyout('unmanaged-1')
      );

      expect(state.unmanagedFlyouts).toEqual(['unmanaged-1']);

      state = flyoutManagerReducer(state, addUnmanagedFlyout('unmanaged-2'));

      expect(state.unmanagedFlyouts).toEqual(['unmanaged-1', 'unmanaged-2']);
    });

    it('should ignore duplicated flyouts', () => {
      let state = flyoutManagerReducer(
        initialState,
        addUnmanagedFlyout('unmanaged-1')
      );

      state = flyoutManagerReducer(state, addUnmanagedFlyout('unmanaged-1'));

      expect(state.unmanagedFlyouts).toEqual(['unmanaged-1']);
    });

    it('should correctly update currentZIndex value', () => {
      let state = flyoutManagerReducer(
        initialState,
        addUnmanagedFlyout('unmanaged-1')
      );

      expect(state.currentZIndex).toEqual(2);

      state = flyoutManagerReducer(state, addUnmanagedFlyout('unmanaged-2'));
      expect(state.currentZIndex).toEqual(4);
    });

    it('should correctly update currentZIndex value when there are managed flyout sessions registered', () => {
      let state = flyoutManagerReducer(
        initialState,
        addUnmanagedFlyout('unmanaged-1')
      );

      state = flyoutManagerReducer(
        state,
        addFlyout('main-1', 'main', LEVEL_MAIN)
      );

      state = flyoutManagerReducer(state, addUnmanagedFlyout('unmanaged-2'));

      expect(state.currentZIndex).toEqual(7);
    });
  });

  describe('ACTION_CLOSE_UNMANAGED', () => {
    it('should close an unmanaged flyout', () => {
      let state = flyoutManagerReducer(
        initialState,
        addUnmanagedFlyout('unmanaged-1')
      );

      state = flyoutManagerReducer(state, addUnmanagedFlyout('unmanaged-2'));
      expect(state.unmanagedFlyouts).toEqual(['unmanaged-1', 'unmanaged-2']);

      state = flyoutManagerReducer(state, closeUnmanagedFlyout('unmanaged-2'));
      expect(state.unmanagedFlyouts).toEqual(['unmanaged-1']);

      state = flyoutManagerReducer(state, closeUnmanagedFlyout('unmanaged-1'));
      expect(state.unmanagedFlyouts).toHaveLength(0);
    });

    it('should reset currentZIndex value when all unmanaged flyouts are closed', () => {
      let state = flyoutManagerReducer(
        initialState,
        addUnmanagedFlyout('unmanaged-1')
      );

      state = flyoutManagerReducer(state, addUnmanagedFlyout('unmanaged-2'));

      state = flyoutManagerReducer(state, closeUnmanagedFlyout('unmanaged-2'));
      expect(state.currentZIndex).toEqual(4);

      state = flyoutManagerReducer(state, closeUnmanagedFlyout('unmanaged-1'));
      expect(state.currentZIndex).toEqual(0);
    });

    it('should not update currentZIndex value all unmanaged flyouts are closed but some sessions exist', () => {
      let state = flyoutManagerReducer(
        initialState,
        addUnmanagedFlyout('unmanaged-1')
      );

      state = flyoutManagerReducer(
        state,
        addFlyout('main-1', 'main', LEVEL_MAIN)
      );

      state = flyoutManagerReducer(state, closeUnmanagedFlyout('unmanaged-1'));
      expect(state.currentZIndex).toEqual(5);
    });

    it('should reset currentZIndex value when all unmanaged and managed flyouts are closed', () => {
      let state = flyoutManagerReducer(
        initialState,
        addUnmanagedFlyout('unmanaged-1')
      );

      state = flyoutManagerReducer(state, addUnmanagedFlyout('unmanaged-2'));

      state = flyoutManagerReducer(
        state,
        addFlyout('main-1', 'main', LEVEL_MAIN)
      );

      state = flyoutManagerReducer(state, closeUnmanagedFlyout('unmanaged-1'));
      state = flyoutManagerReducer(state, closeAllFlyouts());
      expect(state.currentZIndex).toEqual(7);

      state = flyoutManagerReducer(state, closeUnmanagedFlyout('unmanaged-2'));
      expect(state.currentZIndex).toEqual(0);
    });
  });

  describe('default case', () => {
    it('should return current state for unknown actions', () => {
      const unknownAction = { type: 'UNKNOWN_ACTION' } as any;
      const newState = flyoutManagerReducer(initialState, unknownAction);

      expect(newState).toEqual(initialState);
    });
  });

  describe('complex scenarios', () => {
    it('should handle complete flyout lifecycle', () => {
      let state = initialState;

      // 1. Add main flyout
      state = flyoutManagerReducer(
        state,
        addFlyout('main-1', 'main', LEVEL_MAIN, 'l')
      );
      expect(state.flyouts).toHaveLength(1);
      expect(state.sessions).toHaveLength(1);

      // 2. Add child flyout
      state = flyoutManagerReducer(
        state,
        addFlyout('child-1', 'child', LEVEL_CHILD, 'm')
      );
      expect(state.flyouts).toHaveLength(2);
      expect(state.sessions[0].childFlyoutId).toBe('child-1');

      // 3. Set child as active
      state = flyoutManagerReducer(state, setActiveFlyout('child-1'));
      expect(state.sessions[0].childFlyoutId).toBe('child-1');

      // 4. Update widths
      state = flyoutManagerReducer(state, setFlyoutWidth('main-1', 600));
      state = flyoutManagerReducer(state, setFlyoutWidth('child-1', 400));

      // 5. Update activity stages
      state = flyoutManagerReducer(
        state,
        setActivityStage('main-1', STAGE_ACTIVE)
      );
      state = flyoutManagerReducer(
        state,
        setActivityStage('child-1', STAGE_ACTIVE)
      );

      // 6. Close child flyout
      state = flyoutManagerReducer(state, closeFlyout('child-1'));
      expect(state.flyouts).toHaveLength(1);
      expect(state.sessions[0].childFlyoutId).toBe(null);

      // 7. Close main flyout
      state = flyoutManagerReducer(state, closeAllFlyouts());
      expect(state.flyouts).toHaveLength(0);
      expect(state.sessions).toHaveLength(0);
    });

    it('should handle multiple sessions with children', () => {
      const historyKey = Symbol();
      let state = initialState;

      // Session 1: main + child (shared historyKey)
      state = flyoutManagerReducer(
        state,
        addFlyout('main-1', 'main', LEVEL_MAIN, undefined, historyKey)
      );
      state = flyoutManagerReducer(
        state,
        addFlyout('child-1', 'child', LEVEL_CHILD)
      );

      // Session 2: main only (same historyKey)
      state = flyoutManagerReducer(
        state,
        addFlyout('main-2', 'main', LEVEL_MAIN, undefined, historyKey)
      );

      expect(state.sessions).toHaveLength(2);
      expect(state.sessions[0]).toMatchObject({
        mainFlyoutId: 'main-1',
        childFlyoutId: 'child-1',
        childTitle: 'child',
        childIconType: undefined,
        childHistory: [],
        title: 'main',
        zIndex: 0,
      });
      expect(state.sessions[1]).toMatchObject({
        mainFlyoutId: 'main-2',
        childFlyoutId: null,
        childHistory: [],
        title: 'main',
        zIndex: 3,
      });

      // Close current history group (both sessions share key, so both close)
      state = flyoutManagerReducer(state, closeAllFlyouts());

      expect(state.sessions).toHaveLength(0);
      expect(state.flyouts).toHaveLength(0);
    });
  });
});
