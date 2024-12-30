/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { createContext, FunctionComponent, useMemo } from 'react';
import classNames from 'classnames';
import { useEuiTheme } from '../../../services';
import { EuiPaddingSize } from '../../../global_styling';
import { EuiPanel, _EuiPanelDivlike } from '../../panel/panel';
import { EuiPopoverArrowPositions } from '../popover_arrow';
import { euiPopoverPanelStyles } from './_popover_panel.styles';

const DEFAULT_PANEL_PADDING_SIZE = 'l';

export const EuiPopoverPanelContext = createContext<{
  paddingSize: EuiPaddingSize;
}>({
  paddingSize: DEFAULT_PANEL_PADDING_SIZE,
});

export type EuiPopoverPanelProps = _EuiPanelDivlike;

type EuiPopoverPanelInternalProps = {
  isOpen?: boolean;
  isAttached?: boolean;
  position?: EuiPopoverArrowPositions | null;
};

/**
 * *INTERNAL ONLY*
 * Purely for re-use of styling
 */
export const EuiPopoverPanel: FunctionComponent<
  EuiPopoverPanelProps & EuiPopoverPanelInternalProps
> = ({ children, className, isOpen, isAttached, position, ...rest }) => {
  const classes = classNames('euiPopover__panel', className);

  const euiThemeContext = useEuiTheme();
  const cssStyles = useMemo(() => {
    const styles = euiPopoverPanelStyles(euiThemeContext);
    const colorMode = euiThemeContext.colorMode.toLowerCase() as Lowercase<
      'LIGHT' | 'DARK'
    >;

    const sharedStyles = [
      styles.euiPopover__panel,
      styles[colorMode],
      isOpen && styles.isOpen,
    ];

    if (isAttached) {
      return [
        ...sharedStyles,
        styles.isAttached.isAttached,
        position && styles.isAttached[position],
      ];
    }
    return [
      ...sharedStyles,
      styles.hasTransform.hasTransform,
      isOpen && position && styles.hasTransform[position],
    ];
  }, [euiThemeContext, isOpen, position, isAttached]);

  return (
    <EuiPopoverPanelContext.Provider
      value={{ paddingSize: rest.paddingSize || DEFAULT_PANEL_PADDING_SIZE }}
    >
      <EuiPanel
        className={classes}
        css={cssStyles}
        data-popover-panel
        data-popover-open={isOpen || undefined}
        {...rest}
      >
        {children}
      </EuiPanel>
    </EuiPopoverPanelContext.Provider>
  );
};
