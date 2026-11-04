/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import {
  EuiTitle,
  useEuiMemoizedStyles,
  UseEuiTheme,
} from '@elastic/eui';

import { useDocSidebarLabel } from './use_doc_sidebar_label';

const getStyles = ({ euiTheme }: UseEuiTheme) => ({
  title: css`
    flex-shrink: 0;
    margin: 0;
    padding-inline: ${euiTheme.size.m};
    padding-block: ${euiTheme.size.m} ${euiTheme.size.s};
    color: ${euiTheme.colors.textParagraph};
    /* Match page canvas so the fixed header blends when at rest */
    background-color: ${euiTheme.colors.backgroundBaseSubdued};
    border-block-end: ${euiTheme.border.width.thin} solid transparent;
  `,
  titleScrolled: css`
    border-block-end-color: ${euiTheme.border.color};
  `,
});

export const DocSidebarTitle = ({
  isScrolled = false,
}: {
  isScrolled?: boolean;
}) => {
  const label = useDocSidebarLabel();
  const styles = useEuiMemoizedStyles(getStyles);

  if (!label) {
    return null;
  }

  return (
    <EuiTitle size="xs">
      <h2 css={[styles.title, isScrolled && styles.titleScrolled]}>{label}</h2>
    </EuiTitle>
  );
};
