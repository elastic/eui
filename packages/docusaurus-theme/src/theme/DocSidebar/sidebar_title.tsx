/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { useEuiMemoizedStyles, UseEuiTheme } from '@elastic/eui';

import { useDocSidebarSections } from './use_doc_sidebar_sections';

const getStyles = ({ euiTheme }: UseEuiTheme) => ({
  root: css`
    flex-shrink: 0;
    padding-inline: ${euiTheme.size.m};
    padding-block: ${euiTheme.size.m} ${euiTheme.size.s};
    /* Match page canvas so the fixed header blends when at rest */
    background-color: ${euiTheme.colors.backgroundBaseSubdued};
    border-block-end: ${euiTheme.border.width.thin} solid transparent;
  `,
  rootScrolled: css`
    border-block-end-color: ${euiTheme.border.color};
  `,
  // POC: static section label — section switching lives in the navbar now
  title: css`
    margin: 0;
    color: ${euiTheme.colors.textHeading};
    font-size: var(--eui-font-size-s);
    font-weight: ${euiTheme.font.weight.bold};
    line-height: var(--eui-line-height-s);
  `,
});

export const DocSidebarTitle = ({
  isScrolled = false,
}: {
  isScrolled?: boolean;
}) => {
  const { activeLabel } = useDocSidebarSections();
  const styles = useEuiMemoizedStyles(getStyles);

  if (!activeLabel) {
    return null;
  }

  return (
    <div css={[styles.root, isScrolled && styles.rootScrolled]}>
      <p css={styles.title}>{activeLabel}</p>
    </div>
  );
};
