/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { toolTipManager } from './tool_tip_manager';

describe('ToolTipManager', () => {
  describe('registerToolTip', () => {
    const hideToolTip = jest.fn();

    it('stores the passed hideToolTip callback', () => {
      toolTipManager.registerTooltip(hideToolTip);

      expect(toolTipManager.toolTipsToHide.has(hideToolTip)).toBeTruthy();
    });

    it('calls the previously stored hideToolTip callback and removes it from storage', () => {
      toolTipManager.registerTooltip(() => {});

      expect(hideToolTip).toHaveBeenCalledTimes(1);
      expect(toolTipManager.toolTipsToHide.has(hideToolTip)).toBeFalsy();
    });
  });

  describe('deregisterToolTip', () => {
    // If the current tooltip is already hidden before the next tooltip is visible,
    // there's no need to re-hide it, so we deregister the callback
    const deregisteredHide = jest.fn();

    it('removes the hide callback from storage', () => {
      toolTipManager.registerTooltip(deregisteredHide);
      toolTipManager.deregisterToolTip(deregisteredHide);
      toolTipManager.registerTooltip(() => {});

      expect(deregisteredHide).toHaveBeenCalledTimes(0);
      expect(toolTipManager.toolTipsToHide.has(deregisteredHide)).toBeFalsy();
    });
  });
});
