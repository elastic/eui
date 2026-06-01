/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { toolTipManager } from './tool_tip_manager';

describe('ToolTipManager', () => {
  afterEach(() => {
    // Reset the singleton between tests to prevent cross-test contamination
    toolTipManager.reset();
  });

  describe('registerTooltip', () => {
    it('does not call the newly registered callback', () => {
      const hide = jest.fn();

      toolTipManager.registerTooltip(hide);

      expect(hide).not.toHaveBeenCalled();
    });

    it('calls and removes any previously registered callback when a new tooltip registers', () => {
      const hide1 = jest.fn();
      const hide2 = jest.fn();

      toolTipManager.registerTooltip(hide1);
      toolTipManager.registerTooltip(hide2);

      expect(hide1).toHaveBeenCalledTimes(1);
      expect(hide2).not.toHaveBeenCalled();
    });

    it('does not call the callback when re-registering the same tooltip', () => {
      const hide = jest.fn();

      toolTipManager.registerTooltip(hide);
      toolTipManager.registerTooltip(hide);

      expect(hide).not.toHaveBeenCalled();
    });
  });

  describe('registerTooltip skipAnimation signal', () => {
    // The skip-animation decision is time-based, so control `Date.now()`.
    let nowSpy: jest.SpyInstance;

    beforeEach(() => {
      nowSpy = jest.spyOn(Date, 'now').mockReturnValue(1000);
    });

    afterEach(() => {
      nowSpy.mockRestore();
    });

    it('returns skipAnimation: false for the first tooltip', () => {
      const hide = jest.fn();

      expect(toolTipManager.registerTooltip(hide)).toEqual({
        skipAnimation: false,
      });
    });

    it('returns skipAnimation: true when another tooltip is already open', () => {
      toolTipManager.registerTooltip(jest.fn());

      expect(toolTipManager.registerTooltip(jest.fn())).toEqual({
        skipAnimation: true,
      });
    });

    it('returns skipAnimation: true when a tooltip closed within the window', () => {
      const hide = jest.fn();
      toolTipManager.registerTooltip(hide);
      toolTipManager.deregisterToolTip(hide); // lastHiddenAt = 1000

      nowSpy.mockReturnValue(1000 + 299); // just inside the 300ms window

      expect(toolTipManager.registerTooltip(jest.fn())).toEqual({
        skipAnimation: true,
      });
    });

    it('returns skipAnimation: false when the last close was outside the window', () => {
      const hide = jest.fn();
      toolTipManager.registerTooltip(hide);
      toolTipManager.deregisterToolTip(hide); // lastHiddenAt = 1000

      nowSpy.mockReturnValue(1000 + 300); // window has elapsed

      expect(toolTipManager.registerTooltip(jest.fn())).toEqual({
        skipAnimation: false,
      });
    });

    it('returns skipAnimation: false when re-registering the same tooltip', () => {
      const hide = jest.fn();
      toolTipManager.registerTooltip(hide);

      expect(toolTipManager.registerTooltip(hide)).toEqual({
        skipAnimation: false,
      });
    });
  });

  describe('deregisterToolTip', () => {
    it('prevents a deregistered callback from being called when a new tooltip registers', () => {
      // If the current tooltip is already hidden before the next tooltip is visible,
      // there's no need to re-hide it, so we deregister the callback
      const hide1 = jest.fn();
      const hide2 = jest.fn();

      toolTipManager.registerTooltip(hide1);
      toolTipManager.deregisterToolTip(hide1);
      toolTipManager.registerTooltip(hide2);

      expect(hide1).not.toHaveBeenCalled();
    });
  });
});
