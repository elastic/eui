/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent } from 'react';
import classNames from 'classnames';
import { EuiPanel, EuiPanelProps } from '../../panel';
import { EuiPopoverArrowPositions } from '../popover_arrow';
import { euiPopoverStyles } from '../popover.styles';
import { useEuiTheme } from '../../../services';

export type EuiPopoverPanelProps = EuiPanelProps & {
  isOpen?: boolean;
  arrowPosition?: EuiPopoverArrowPositions | null;
  attached?: boolean;
};

/**
 * *INTERNAL ONLY*
 * Purely for re-use of styling
 */
export const EuiPopoverPanel: FunctionComponent<EuiPopoverPanelProps> = ({
  children,
  className,
  isOpen,
  arrowPosition,
  attached,
  ...rest
}) => {
  const euiThemeContext = useEuiTheme();
  // Using BEM child class for BWC
  const classes = classNames('euiPopover__panel', className);
  const styles = euiPopoverStyles(euiThemeContext);

  let panelCSS = [
    styles.euiPopover__panel,
    isOpen && styles.isOpen,
    isOpen && arrowPosition && styles[arrowPosition],
  ];

  if (attached) {
    panelCSS = [
      // @ts-ignore Help
      ...panelCSS,
      // @ts-ignore Help
      isOpen && styles.attached.isOpen,
      // @ts-ignore Help
      arrowPosition && styles.attached[arrowPosition],
    ];
  }

  return (
    <EuiPanel
      className={classes}
      css={panelCSS}
      data-popover-panel
      data-popover-open={isOpen || undefined}
      {...rest}
    >
      {children}
    </EuiPanel>
  );
};
