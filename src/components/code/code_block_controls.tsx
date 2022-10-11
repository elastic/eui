/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FC, Fragment, ReactNode } from 'react';
import { useEuiTheme } from '../../services';
import type { EuiCodeBlockPaddingSize } from './code_block';
import { euiCodeBlockControlsStyles } from './code_block_controls.styles';

export const EuiCodeBlockControls: FC<{
  controls: ReactNode[];
  paddingSize: EuiCodeBlockPaddingSize;
}> = ({ paddingSize, controls }) => {
  const euiTheme = useEuiTheme();
  const styles = euiCodeBlockControlsStyles(euiTheme);
  const cssStyles = [styles.euiCodeBlock__controls, styles.offset[paddingSize]];

  const hasControls = controls.some((control) => !!control);

  return hasControls ? (
    <div className="euiCodeBlock__controls" css={cssStyles}>
      {controls.map((control, i) => (
        <Fragment key={i}>{control}</Fragment>
      ))}
    </div>
  ) : null;
};
