/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the "Elastic License
 * 2.0", the "GNU Affero General Public License v3.0 only", and the "Server Side
 * Public License v 1"; you may not use this file except in compliance with, at
 * your election, the "Elastic License 2.0", the "GNU Affero General Public
 * License v3.0 only", or the "Server Side Public License, v 1".
 */

import React, { FunctionComponent, ReactNode } from 'react';

import { useEuiMemoizedStyles } from '../../../../services';
import { EuiTitle } from '../../../title';
import type { CommonProps } from '../../../common';

import { euiQuickSelectPanelStyles } from './quick_select_panel.styles';

type EuiQuickSelectPanelProps = CommonProps & {
  component?: 'div' | 'fieldset';
  title?: ReactNode;
  titleId?: string;
  children?: ReactNode;
};

export const EuiQuickSelectPanel: FunctionComponent<
  EuiQuickSelectPanelProps
> = ({ component: Component = 'div', title, titleId, children, ...rest }) => {
  const isFieldset = Component === 'fieldset';
  const TitleComponent = isFieldset ? 'legend' : 'span';

  const styles = useEuiMemoizedStyles(euiQuickSelectPanelStyles);

  return (
    <Component css={styles.euiQuickSelectPanel} {...rest}>
      {title ? (
        <>
          <EuiTitle size="xxxs">
            <TitleComponent
              id={titleId}
              css={styles.euiQuickSelectPanel__title}
            >
              {title}
            </TitleComponent>
          </EuiTitle>
          <div css={styles.euiQuickSelectPanel__section}>{children}</div>
        </>
      ) : (
        children
      )}
    </Component>
  );
};
