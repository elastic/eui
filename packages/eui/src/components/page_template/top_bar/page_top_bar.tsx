/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, PropsWithChildren } from 'react';

import { useEuiMemoizedStyles } from '../../../services';
import { EuiPageSection, EuiPageSectionProps } from '../../page/page_section';

import { euiPageTopBarStyles } from './page_top_bar.styles';

export type _EuiPageTopBarProps = PropsWithChildren & {
  /**
   * Determines bar background color
   */
  panelled?: boolean;
  /**
   * Determines whether a bottom border separating the bar and page sections is rendered
   */
  contentBorder?: boolean;
  /**
   * Aligns bar content to the left, right, or center
   */
  align?: 'left' | 'right' | 'center';
} & Pick<EuiPageSectionProps, 'restrictWidth' | 'paddingSize'>;

export const _EuiPageTopBar: FunctionComponent<_EuiPageTopBarProps> = ({
  panelled,
  contentBorder = true,
  align = 'right',
  restrictWidth,
  paddingSize = 'm',
  children,
  ...rest
}) => {
  const styles = useEuiMemoizedStyles(euiPageTopBarStyles);
  const cssStyles = [
    styles.euiPageTopBar,
    panelled ? styles.panelled : styles.unpanelled,
    contentBorder && styles.bordered,
  ];
  const contentStyles = [
    styles.euiPageTopBar__content,
    styles.align[align],
    paddingSize && styles.sizes[paddingSize],
  ];

  return (
    <div css={cssStyles} {...rest}>
      {/* Wrapping the contents with EuiPageSection allows us to match the restrictWidth to keep the contents aligned */}
      <EuiPageSection
        paddingSize={paddingSize}
        restrictWidth={restrictWidth}
        contentProps={{ css: contentStyles }}
      >
        {children}
      </EuiPageSection>
    </div>
  );
};
