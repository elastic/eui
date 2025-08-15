/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { JSX } from 'react';
import clsx from 'clsx';
import { css } from '@emotion/react';
import Translate from '@docusaurus/Translate';
import type { Props } from '@theme-original/TOCCollapsible/CollapseButton';
import { EuiIcon, useEuiMemoizedStyles, UseEuiTheme } from '@elastic/eui';

// coverted from css modules to Emotion
const getStyles = ({ euiTheme }: UseEuiTheme) => {
  return {
    tocCollapsibleButton: css`
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      padding: ${euiTheme.size.s} ${euiTheme.size.m};
      border-radius: ${euiTheme.border.radius.small};
      font-size: inherit;
    `,
  };
};

export default function TOCCollapsibleCollapseButton({
  collapsed,
  ...props
}: Props): JSX.Element {
  const styles = useEuiMemoizedStyles(getStyles);

  return (
    <button
      type="button"
      {...props}
      className={clsx('clean-btn', props.className)}
      css={styles.tocCollapsibleButton}
    >
      <Translate
        id="theme.TOCCollapsible.toggleButtonLabel"
        description="The label used by the button on the collapsible TOC component"
      >
        On this page
      </Translate>
      <EuiIcon type={collapsed ? 'arrowDown' : 'arrowUp'} />
    </button>
  );
}
