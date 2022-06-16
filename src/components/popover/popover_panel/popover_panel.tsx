/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { createContext, FunctionComponent, useContext } from 'react';
import classNames from 'classnames';
import { useEuiTheme } from '../../../services';
import { EuiPaddingSize } from '../../../global_styling';
import { EuiPanel, EuiPanelProps } from '../../panel';
import { EuiPopoverArrowPositions } from '../popover_arrow';
import { euiPopoverPanelStyles } from './popover_panel.styles';

interface ContextShape {
  paddingSize: EuiPaddingSize;
}

export const EuiPopoverPanelContext = createContext<ContextShape>({
  paddingSize: 'l',
});

export type EuiPopoverPanelProps = EuiPanelProps & {
  isOpen?: boolean;
  isAttached?: boolean;
  position?: EuiPopoverArrowPositions | null;
};

/**
 * *INTERNAL ONLY*
 * Purely for re-use of styling
 */
export const EuiPopoverPanel: FunctionComponent<EuiPopoverPanelProps> = ({
  children,
  className,
  isOpen,
  isAttached,
  position,
  ...rest
}) => {
  const panelContext = useContext(EuiPopoverPanelContext);
  if (rest.paddingSize) panelContext.paddingSize = rest.paddingSize;

  const euiThemeContext = useEuiTheme();
  // Using BEM child class for BWC
  const classes = classNames('euiPopover__panel', className);
  const styles = euiPopoverPanelStyles(euiThemeContext);

  let panelCSS = [
    styles.euiPopover__panel,
    isOpen && styles.isOpen,
    isOpen && position && styles[position],
  ];

  if (isAttached) {
    panelCSS = [
      // @ts-ignore Help
      ...panelCSS,
      // @ts-ignore Help
      isOpen && styles.attached.isOpen,
      // @ts-ignore Help
      position && styles.attached[position],
    ];
  }

  return (
    <EuiPopoverPanelContext.Provider value={panelContext}>
      <EuiPanel
        className={classes}
        css={panelCSS}
        data-popover-panel
        data-popover-open={isOpen || undefined}
        {...rest}
      >
        {children}
      </EuiPanel>
    </EuiPopoverPanelContext.Provider>
  );
};
