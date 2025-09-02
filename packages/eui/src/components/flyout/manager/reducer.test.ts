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
      const action = addFlyout('main-1', LEVEL_MAIN, 'm');
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
        main: 'main-1',
        child: null,
      });
    });

    it('should add a child flyout to the most recent session', () => {
      // First add a main flyout
      let state = flyoutManagerReducer(
        initialState,
        addFlyout('main-1', LEVEL_MAIN)
      );

      // Then add a child flyout
      const action = addFlyout('child-1', LEVEL_CHILD);
      state = flyoutManagerReducer(state, action);

      expect(state.flyouts).toHaveLength(2);
      expect(state.sessions).toHaveLength(1);
      expect(state.sessions[0].child).toBe('child-1');
    });

    it('should ignore duplicate flyout IDs', () => {
      const action1 = addFlyout('main-1', LEVEL_MAIN);
      let state = flyoutManagerReducer(initialState, action1);

      const action2 = addFlyout('main-1', LEVEL_MAIN);
      state = flyoutManagerReducer(state, action2);

      expect(state.flyouts).toHaveLength(1);
      expect(state.sessions).toHaveLength(1);
    });

    it('should not add child flyout when no session exists', () => {
      const action = addFlyout('child-1', LEVEL_CHILD);
      const newState = flyoutManagerReducer(initialState, action);

      expect(newState).toEqual(initialState);
    });

    it('should handle multiple sessions correctly', () => {
      // Add first main flyout
      let state = flyoutManagerReducer(
        initialState,
        addFlyout('main-1', LEVEL_MAIN)
      );

      // Add child to first session
      state = flyoutManagerReducer(state, addFlyout('child-1', LEVEL_CHILD));

      // Add second main flyout (should create new session)
      state = flyoutManagerReducer(state, addFlyout('main-2', LEVEL_MAIN));

      expect(state.sessions).toHaveLength(2);
      expect(state.sessions[0]).toEqual({ main: 'main-1', child: 'child-1' });
      expect(state.sessions[1]).toEqual({ main: 'main-2', child: null });
    });
  });

  describe('ACTION_CLOSE', () => {
    it('should close a main flyout and remove its session', () => {
      // Setup: add main flyout with child
      let state = flyoutManagerReducer(
        initialState,
        addFlyout('main-1', LEVEL_MAIN)
      );
      state = flyoutManagerReducer(state, addFlyout('child-1', LEVEL_CHILD));

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
        addFlyout('main-1', LEVEL_MAIN)
      );
      state = flyoutManagerReducer(state, addFlyout('child-1', LEVEL_CHILD));

      // Close child flyout
      const action = closeFlyout('child-1');
      state = flyoutManagerReducer(state, action);

      expect(state.flyouts).toHaveLength(1);
      expect(state.flyouts[0].flyoutId).toBe('main-1');
      expect(state.sessions[0].child).toBe(null);
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
        addFlyout('main-1', LEVEL_MAIN)
      );

      const action = setActiveFlyout('child-1');
      state = flyoutManagerReducer(state, action);

      expect(state.sessions[0].child).toBe('child-1');
    });

    it('should clear active child flyout when null is passed', () => {
      // Setup: add main flyout with child
      let state = flyoutManagerReducer(
        initialState,
        addFlyout('main-1', LEVEL_MAIN)
      );
      state = flyoutManagerReducer(state, addFlyout('child-1', LEVEL_CHILD));

      const action = setActiveFlyout(null);
      state = flyoutManagerReducer(state, action);

      expect(state.sessions[0].child).toBe(null);
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
        addFlyout('main-1', LEVEL_MAIN)
      );

      const action = setFlyoutWidth('main-1', 400);
      state = flyoutManagerReducer(state, action);

      expect(state.flyouts[0].width).toBe(400);
    });

    it('should not affect other flyouts', () => {
      // Setup: add two flyouts
      let state = flyoutManagerReducer(
        initialState,
        addFlyout('main-1', LEVEL_MAIN)
      );
      state = flyoutManagerReducer(state, addFlyout('main-2', LEVEL_MAIN));

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
        addFlyout('main-1', LEVEL_MAIN)
      );

      const action = setActivityStage('main-1', STAGE_ACTIVE);
      state = flyoutManagerReducer(state, action);

      expect(state.flyouts[0].activityStage).toBe(STAGE_ACTIVE);
    });

    it('should handle all activity stages', () => {
      // Setup: add flyout
      let state = flyoutManagerReducer(
        initialState,
        addFlyout('main-1', LEVEL_MAIN)
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
        addFlyout('main-1', LEVEL_MAIN)
      );
      state = flyoutManagerReducer(state, addFlyout('main-2', LEVEL_MAIN));

      const action = setActivityStage('main-1', STAGE_ACTIVE);
      state = flyoutManagerReducer(state, action);

      expect(state.flyouts[0].activityStage).toBe(STAGE_ACTIVE);
      expect(state.flyouts[1].activityStage).toBe(STAGE_OPENING);
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
      state = flyoutManagerReducer(state, addFlyout('main-1', LEVEL_MAIN, 'l'));
      expect(state.flyouts).toHaveLength(1);
      expect(state.sessions).toHaveLength(1);

      // 2. Add child flyout
      state = flyoutManagerReducer(
        state,
        addFlyout('child-1', LEVEL_CHILD, 'm')
      );
      expect(state.flyouts).toHaveLength(2);
      expect(state.sessions[0].child).toBe('child-1');

      // 3. Set child as active
      state = flyoutManagerReducer(state, setActiveFlyout('child-1'));
      expect(state.sessions[0].child).toBe('child-1');

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
      expect(state.sessions[0].child).toBe(null);

      // 7. Close main flyout
      state = flyoutManagerReducer(state, closeFlyout('main-1'));
      expect(state.flyouts).toHaveLength(0);
      expect(state.sessions).toHaveLength(0);
    });

    it('should handle multiple sessions with children', () => {
      let state = initialState;

      // Session 1: main + child
      state = flyoutManagerReducer(state, addFlyout('main-1', LEVEL_MAIN));
      state = flyoutManagerReducer(state, addFlyout('child-1', LEVEL_CHILD));

      // Session 2: main only
      state = flyoutManagerReducer(state, addFlyout('main-2', LEVEL_MAIN));

      expect(state.sessions).toHaveLength(2);
      expect(state.sessions[0]).toEqual({ main: 'main-1', child: 'child-1' });
      expect(state.sessions[1]).toEqual({ main: 'main-2', child: null });

      // Close first session's main flyout
      state = flyoutManagerReducer(state, closeFlyout('main-1'));

      expect(state.sessions).toHaveLength(1);
      expect(state.sessions[0].main).toBe('main-2');
    });
  });
});
