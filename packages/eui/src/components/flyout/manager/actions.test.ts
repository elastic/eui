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

import {
  addFlyout,
  closeFlyout,
  setActiveFlyout,
  setFlyoutWidth,
  setLayoutMode,
  setActivityStage,
  ACTION_ADD,
  ACTION_CLOSE,
  ACTION_SET_ACTIVE,
  ACTION_SET_WIDTH,
  ACTION_SET_LAYOUT_MODE,
  ACTION_SET_ACTIVITY_STAGE,
} from './actions';
import {
  LEVEL_MAIN,
  LEVEL_CHILD,
  LAYOUT_MODE_SIDE_BY_SIDE,
  LAYOUT_MODE_STACKED,
  STAGE_OPENING,
  STAGE_ACTIVE,
  STAGE_CLOSING,
} from './const';

describe('flyout manager actions', () => {
  describe('action constants', () => {
    it('should have correct action type prefixes', () => {
      expect(ACTION_ADD).toBe('eui/flyoutManager/add');
      expect(ACTION_CLOSE).toBe('eui/flyoutManager/close');
      expect(ACTION_SET_ACTIVE).toBe('eui/flyoutManager/setActive');
      expect(ACTION_SET_WIDTH).toBe('eui/flyoutManager/setWidth');
      expect(ACTION_SET_LAYOUT_MODE).toBe('eui/flyoutManager/setLayoutMode');
      expect(ACTION_SET_ACTIVITY_STAGE).toBe(
        'eui/flyoutManager/setActivityStage'
      );
    });
  });

  describe('addFlyout', () => {
    it('should create add flyout action with required parameters', () => {
      const action = addFlyout('flyout-1', 'main', LEVEL_MAIN);

      expect(action).toEqual({
        type: ACTION_ADD,
        flyoutId: 'flyout-1',
        title: 'main',
        level: LEVEL_MAIN,
      });
    });

    it('should create add flyout action with all parameters', () => {
      const action = addFlyout('flyout-1', 'main', LEVEL_MAIN, 'l');

      expect(action).toEqual({
        type: ACTION_ADD,
        flyoutId: 'flyout-1',
        title: 'main',
        level: LEVEL_MAIN,
        size: 'l',
      });
    });

    it('should default to LEVEL_MAIN when level is not provided', () => {
      const action = addFlyout('flyout-1', 'flyout title');

      expect(action).toEqual({
        type: ACTION_ADD,
        flyoutId: 'flyout-1',
        title: 'flyout title',
        level: LEVEL_MAIN,
      });
    });

    it('should handle child level flyouts', () => {
      const action = addFlyout('child-1', 'child', LEVEL_CHILD, 'm');

      expect(action).toEqual({
        type: ACTION_ADD,
        flyoutId: 'child-1',
        title: 'child',
        level: LEVEL_CHILD,
        size: 'm',
      });
    });

    it('should handle undefined size parameter', () => {
      const action = addFlyout('flyout-1', 'main', LEVEL_MAIN, undefined);

      expect(action).toEqual({
        type: ACTION_ADD,
        flyoutId: 'flyout-1',
        title: 'main',
        level: LEVEL_MAIN,
        size: undefined,
      });
    });
  });

  describe('closeFlyout', () => {
    it('should create close flyout action', () => {
      const action = closeFlyout('flyout-1');

      expect(action).toEqual({
        type: ACTION_CLOSE,
        flyoutId: 'flyout-1',
      });
    });

    it('should handle different flyout IDs', () => {
      const action1 = closeFlyout('main-1');
      const action2 = closeFlyout('child-1');

      expect(action1.flyoutId).toBe('main-1');
      expect(action2.flyoutId).toBe('child-1');
    });
  });

  describe('setActiveFlyout', () => {
    it('should create set active flyout action with flyout ID', () => {
      const action = setActiveFlyout('child-1');

      expect(action).toEqual({
        type: ACTION_SET_ACTIVE,
        flyoutId: 'child-1',
      });
    });

    it('should create set active flyout action with null', () => {
      const action = setActiveFlyout(null);

      expect(action).toEqual({
        type: ACTION_SET_ACTIVE,
        flyoutId: null,
      });
    });

    it('should handle empty string flyout ID', () => {
      const action = setActiveFlyout('');

      expect(action).toEqual({
        type: ACTION_SET_ACTIVE,
        flyoutId: '',
      });
    });
  });

  describe('setFlyoutWidth', () => {
    it('should create set width action', () => {
      const action = setFlyoutWidth('flyout-1', 400);

      expect(action).toEqual({
        type: ACTION_SET_WIDTH,
        flyoutId: 'flyout-1',
        width: 400,
      });
    });

    it('should handle different width values', () => {
      const action1 = setFlyoutWidth('flyout-1', 0);
      const action2 = setFlyoutWidth('flyout-2', 1000);
      const action3 = setFlyoutWidth('flyout-3', 500.5);

      expect(action1.width).toBe(0);
      expect(action2.width).toBe(1000);
      expect(action3.width).toBe(500.5);
    });

    it('should handle different flyout IDs', () => {
      const action1 = setFlyoutWidth('main-1', 400);
      const action2 = setFlyoutWidth('child-1', 300);

      expect(action1.flyoutId).toBe('main-1');
      expect(action2.flyoutId).toBe('child-1');
    });
  });

  describe('setLayoutMode', () => {
    it('should create set layout mode action for side-by-side', () => {
      const action = setLayoutMode(LAYOUT_MODE_SIDE_BY_SIDE);

      expect(action).toEqual({
        type: ACTION_SET_LAYOUT_MODE,
        layoutMode: LAYOUT_MODE_SIDE_BY_SIDE,
      });
    });

    it('should create set layout mode action for stacked', () => {
      const action = setLayoutMode(LAYOUT_MODE_STACKED);

      expect(action).toEqual({
        type: ACTION_SET_LAYOUT_MODE,
        layoutMode: LAYOUT_MODE_STACKED,
      });
    });

    it('should handle layout mode constants correctly', () => {
      expect(LAYOUT_MODE_SIDE_BY_SIDE).toBe('side-by-side');
      expect(LAYOUT_MODE_STACKED).toBe('stacked');
    });
  });

  describe('setActivityStage', () => {
    it('should create set activity stage action', () => {
      const action = setActivityStage('flyout-1', STAGE_ACTIVE);

      expect(action).toEqual({
        type: ACTION_SET_ACTIVITY_STAGE,
        flyoutId: 'flyout-1',
        activityStage: STAGE_ACTIVE,
      });
    });

    it('should handle different activity stages', () => {
      const stages = [STAGE_OPENING, STAGE_ACTIVE, STAGE_CLOSING];

      stages.forEach((stage) => {
        const action = setActivityStage('flyout-1', stage as any);
        expect(action.activityStage).toBe(stage);
      });
    });

    it('should handle different flyout IDs', () => {
      const action1 = setActivityStage('main-1', STAGE_ACTIVE);
      const action2 = setActivityStage('child-1', STAGE_OPENING);

      expect(action1.flyoutId).toBe('main-1');
      expect(action2.flyoutId).toBe('child-1');
    });
  });

  describe('action type safety', () => {
    it('should have correct action type structure', () => {
      const addAction = addFlyout('test', 'flyout title');
      const closeAction = closeFlyout('test');
      const setActiveAction = setActiveFlyout('test');
      const setWidthAction = setFlyoutWidth('test', 100);
      const setLayoutAction = setLayoutMode(LAYOUT_MODE_SIDE_BY_SIDE);
      const setStageAction = setActivityStage('test', STAGE_ACTIVE);

      expect(addAction.type).toMatch(/^eui\/flyoutManager\//);
      expect(closeAction.type).toMatch(/^eui\/flyoutManager\//);
      expect(setActiveAction.type).toMatch(/^eui\/flyoutManager\//);
      expect(setWidthAction.type).toMatch(/^eui\/flyoutManager\//);
      expect(setLayoutAction.type).toMatch(/^eui\/flyoutManager\//);
      expect(setStageAction.type).toMatch(/^eui\/flyoutManager\//);
    });

    it('should maintain action immutability', () => {
      const action = addFlyout('test', 'main', LEVEL_MAIN, 'm');
      const originalAction = { ...action };

      // Modify the action object
      (action as any).flyoutId = 'modified';

      // Original action should remain unchanged
      expect(originalAction.flyoutId).toBe('test');
    });
  });

  describe('edge cases', () => {
    it('should handle empty string flyout IDs', () => {
      const action = addFlyout('', 'main', LEVEL_MAIN);
      expect(action.flyoutId).toBe('');
    });

    it('should handle special characters in flyout IDs', () => {
      const specialIds = ['flyout-1', 'flyout_2', 'flyout.3', 'flyout-4'];

      specialIds.forEach((id) => {
        const action = addFlyout(id, 'main', LEVEL_MAIN);
        expect(action.flyoutId).toBe(id);
      });
    });

    it('should handle very large width values', () => {
      const action = setFlyoutWidth('flyout-1', Number.MAX_SAFE_INTEGER);
      expect(action.width).toBe(Number.MAX_SAFE_INTEGER);
    });

    it('should handle zero width values', () => {
      const action = setFlyoutWidth('flyout-1', 0);
      expect(action.width).toBe(0);
    });
  });
});
