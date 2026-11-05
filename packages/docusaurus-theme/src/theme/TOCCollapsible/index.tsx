/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { type ReactNode } from 'react';
import clsx from 'clsx';
import { css } from '@emotion/react';
import { useCollapsible, Collapsible } from '@docusaurus/theme-common';
import type { TOCItem } from '@docusaurus/mdx-loader';
import TOCItems from '@theme-original/TOCItems';
import { useEuiMemoizedStyles, UseEuiTheme } from '@elastic/eui';

import CollapseButton from './CollapseButton';

type Props = {
  readonly toc: readonly TOCItem[];
  readonly minHeadingLevel?: number;
  readonly maxHeadingLevel?: number;
  readonly className?: string;
};

const getStyles = ({ euiTheme }: UseEuiTheme) => ({
  // POC: gray surface instead of Infima menu active (primary blue tint)
  tocCollapsible: css`
    background-color: ${euiTheme.colors.backgroundLightText};
    border-radius: ${euiTheme.border.radius.control};
    margin-block: ${euiTheme.size.m};
    padding-block: ${euiTheme.size.xs};
  `,
  tocCollapsibleContent: css`
    > ul {
      border-left: none;
      border-top: ${euiTheme.border.width.thin} solid ${euiTheme.border.color};
      margin: 0;
      padding-block: ${euiTheme.size.s};
      padding-inline: ${euiTheme.size.s};
      font-size: var(--eui-font-size-s);
    }

    ul li {
      margin-block: ${euiTheme.size.xs};
      margin-inline: ${euiTheme.size.s};
    }

    a {
      display: block;
    }
  `,
});

export default function TOCCollapsible({
  toc,
  className,
  minHeadingLevel,
  maxHeadingLevel,
}: Props): ReactNode {
  const { collapsed, toggleCollapsed } = useCollapsible({
    initialState: true,
  });
  const styles = useEuiMemoizedStyles(getStyles);

  return (
    <div className={clsx(className)} css={styles.tocCollapsible}>
      <CollapseButton collapsed={collapsed} onClick={toggleCollapsed} />
      <Collapsible lazy collapsed={collapsed}>
        <div css={styles.tocCollapsibleContent}>
          <TOCItems
            toc={toc}
            minHeadingLevel={minHeadingLevel}
            maxHeadingLevel={maxHeadingLevel}
          />
        </div>
      </Collapsible>
    </div>
  );
}
