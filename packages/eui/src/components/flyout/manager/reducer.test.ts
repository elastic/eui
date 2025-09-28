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
  setActiveFlyout,
  setFlyoutWidth,
  setLayoutMode,
  setActivityStage,
  goBack,
  goToFlyout,
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
      expect(newState.sessions[0]).toEqual({
        mainFlyoutId: 'main-1',
        childFlyoutId: null,
        title: 'main',
      });
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
      expect(state.sessions[0]).toEqual({
        mainFlyoutId: 'main-1',
        childFlyoutId: 'child-1',
        title: 'main',
      });
      expect(state.sessions[1]).toEqual({
        mainFlyoutId: 'main-2',
        childFlyoutId: null,
        title: 'main',
      });
    });
  });

  describe('ACTION_CLOSE', () => {
    it('should close a main flyout and remove its session', () => {
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
      const action = closeFlyout('main-1');
      state = flyoutManagerReducer(state, action);

      // When main flyout is closed, all related flyouts should be removed
      expect(state.flyouts).toHaveLength(0);
      expect(state.sessions).toHaveLength(0);
    });

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
      // Setup: create two sessions
      let state = flyoutManagerReducer(
        initialState,
        addFlyout('main-1', 'Session A', LEVEL_MAIN)
      );
      state = flyoutManagerReducer(
        state,
        addFlyout('main-2', 'Session B', LEVEL_MAIN)
      );

      expect(state.sessions).toHaveLength(2);
      expect(state.flyouts).toHaveLength(2);

      // Go back (should remove Session B)
      const action = goBack();
      state = flyoutManagerReducer(state, action);

      expect(state.sessions).toHaveLength(1);
      expect(state.sessions[0].mainFlyoutId).toBe('main-1');
      expect(state.sessions[0].title).toBe('Session A');
      expect(state.flyouts).toHaveLength(1);
      expect(state.flyouts[0].flyoutId).toBe('main-1');
    });

    it('should remove current session with child flyout', () => {
      // Setup: create session with child
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

      expect(state.sessions).toHaveLength(2);
      expect(state.sessions[1].childFlyoutId).toBe('child-2');
      expect(state.flyouts).toHaveLength(3);

      // Go back (should remove Session B and its child)
      const action = goBack();
      state = flyoutManagerReducer(state, action);

      expect(state.sessions).toHaveLength(1);
      expect(state.sessions[0].mainFlyoutId).toBe('main-1');
      expect(state.flyouts).toHaveLength(1);
      expect(state.flyouts[0].flyoutId).toBe('main-1');
    });

    it('should do nothing when no sessions exist', () => {
      const action = goBack();
      const newState = flyoutManagerReducer(initialState, action);

      expect(newState).toEqual(initialState);
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
      state = flyoutManagerReducer(state, closeFlyout('main-1'));
      expect(state.flyouts).toHaveLength(0);
      expect(state.sessions).toHaveLength(0);
    });

    it('should handle multiple sessions with children', () => {
      let state = initialState;

      // Session 1: main + child
      state = flyoutManagerReducer(
        state,
        addFlyout('main-1', 'main', LEVEL_MAIN)
      );
      state = flyoutManagerReducer(
        state,
        addFlyout('child-1', 'child', LEVEL_CHILD)
      );

      // Session 2: main only
      state = flyoutManagerReducer(
        state,
        addFlyout('main-2', 'main', LEVEL_MAIN)
      );

      expect(state.sessions).toHaveLength(2);
      expect(state.sessions[0]).toEqual({
        mainFlyoutId: 'main-1',
        childFlyoutId: 'child-1',
        title: 'main',
      });
      expect(state.sessions[1]).toEqual({
        mainFlyoutId: 'main-2',
        childFlyoutId: null,
        title: 'main',
      });

      // Close first session's main flyout
      state = flyoutManagerReducer(state, closeFlyout('main-1'));

      expect(state.sessions).toHaveLength(1);
      expect(state.sessions[0].mainFlyoutId).toBe('main-2');
    });
  });
});
