/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, memo } from 'react';

import { useEuiMemoizedStyles } from '../../services';
import { EuiPopoverTitle } from '../popover';
import { EuiTitle } from '../title';

import type { EuiTourStepProps } from './tour_step';
import { euiTourHeaderStyles } from './_tour_header.styles';

type EuiTourHeaderProps = { id: string } & Pick<
  EuiTourStepProps,
  'title' | 'subtitle'
>;

export const EuiTourHeader: FunctionComponent<EuiTourHeaderProps> = memo(
  ({ id, title, subtitle }) => {
    const headerStyles = useEuiMemoizedStyles(euiTourHeaderStyles);

    return (
      <EuiPopoverTitle
        css={headerStyles.euiTourHeader}
        className="euiTourHeader"
        id={id}
      >
        {subtitle && (
          <EuiTitle css={headerStyles.euiTourHeader__subtitle} size="xxxs">
            <h2>{subtitle}</h2>
          </EuiTitle>
        )}
        <EuiTitle css={headerStyles.euiTourHeader__title} size="xxs">
          {subtitle ? <h3>{title}</h3> : <h2>{title}</h2>}
        </EuiTitle>
      </EuiPopoverTitle>
    );
  }
);
EuiTourHeader.displayName = '_EuiTourHeader';
