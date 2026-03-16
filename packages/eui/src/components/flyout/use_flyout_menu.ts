/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { useGeneratedHtmlId } from '../../services';
import {
  EuiFlyoutMenuDisplayMode,
  MENU_DISPLAY_ALWAYS,
  MENU_DISPLAY_AUTO,
} from './const';
import { EuiFlyoutMenuProps } from './flyout_menu';
import { useMemo } from 'react';
import classnames from 'classnames';

/**
 * @internal
 */
export interface UseEuiFlyoutMenu {
  flyoutMenuProps?: EuiFlyoutMenuProps;
  flyoutMenuDisplayMode: EuiFlyoutMenuDisplayMode;
  ariaLabelledBy?: string;
}

/**
 * Hook to manage flyout menu state and rendering logic.
 * Determines whether the menu should be rendered based on display mode
 * and menu content, and computes the appropriate aria-labelledby value.
 *
 * @internal
 */
export const useEuiFlyoutMenu = ({
  flyoutMenuProps: _flyoutMenuProps,
  flyoutMenuDisplayMode,
  ariaLabelledBy: _ariaLabelledBy,
}: UseEuiFlyoutMenu) => {
  const generatedMenuId = useGeneratedHtmlId();
  const { titleId: _titleId, ...flyoutMenuProps } = _flyoutMenuProps || {};
  const hasMenu = !!_flyoutMenuProps;

  const flyoutMenuId = useMemo(() => {
    if (!hasMenu) return undefined;
    return _titleId || generatedMenuId;
  }, [hasMenu, _titleId, generatedMenuId]);

  // Determine if the menu has any content
  // hasBackButton or hasHistory or hasCustomActions or hasVisibleTitle
  const menuHasContent =
    hasMenu &&
    (!!flyoutMenuProps.showBackButton ||
      (flyoutMenuProps.historyItems?.length ?? 0) > 0 ||
      (flyoutMenuProps.customActions?.length ?? 0) > 0 ||
      // Component defaults to hiding the title, so only explicit false means the title will be visible
      !!(flyoutMenuProps.title && flyoutMenuProps.hideTitle === false));

  // Determine if the menu should be rendered based on the display mode and menu content
  const shouldRenderMenu = useMemo(() => {
    if (!hasMenu) return false;
    if (flyoutMenuDisplayMode === MENU_DISPLAY_ALWAYS) return true;
    if (flyoutMenuDisplayMode === MENU_DISPLAY_AUTO) return menuHasContent;
    return false;
  }, [hasMenu, flyoutMenuDisplayMode, menuHasContent]);

  // If the flyout menu is to be rendered, ensure the flyout has aria-labelledby referencing the menu's titleId
  const ariaLabelledBy = useMemo(() => {
    if (flyoutMenuId && shouldRenderMenu) {
      return classnames(flyoutMenuId, _ariaLabelledBy);
    }
    return _ariaLabelledBy;
  }, [flyoutMenuId, _ariaLabelledBy, shouldRenderMenu]);

  return {
    flyoutMenuId,
    flyoutMenuProps,
    shouldRenderMenu,
    ariaLabelledBy,
  };
};
