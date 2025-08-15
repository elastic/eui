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
import { ThemeClassNames } from '@docusaurus/theme-common';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import MDXContent from '@theme-original/MDXContent';
import {
  EuiHorizontalRule,
  useEuiMemoizedStyles,
  UseEuiTheme,
} from '@elastic/eui';
import { Props } from '@theme-original/DocItem/Content';

import Heading from '../../MDXComponents/Heading';

/**
 Title can be declared inside md content or declared through
 front matter and added manually. To make both cases consistent,
 the added title is added under the same div.markdown block
 See https://github.com/facebook/docusaurus/pull/4882#issuecomment-853021120

 We render a "synthetic title" if:
 - user doesn't ask to hide it with front matter
 - the markdown content does not already contain a top-level h1 heading
*/
function useSyntheticTitle(): string | null {
  const { metadata, frontMatter, contentTitle } = useDoc();
  const shouldRender =
    !frontMatter.hide_title && typeof contentTitle === 'undefined';
  if (!shouldRender) {
    return null;
  }
  return metadata.title;
}

const getContentStyles = ({ euiTheme }: UseEuiTheme) => {
  return {
    header: css`
      // required specificity to override docusaurus styles
      & > h1.euiTitle {
        --ifm-h1-font-size: var(--eui-font-size-xxl);
        --ifm-h1-vertical-rhythm-bottom: 1.2;

        line-height: 2.8rem;
      }
    `,
  };
};

export default function DocItemContent({ children }: Props): JSX.Element {
  const syntheticTitle = useSyntheticTitle();
  const styles = useEuiMemoizedStyles(getContentStyles);

  return (
    <div className={clsx(ThemeClassNames.docs.docMarkdown, 'markdown')}>
      {syntheticTitle && (
        <>
          <header css={styles.header}>
            <Heading as="h1">{syntheticTitle}</Heading>
          </header>
          <EuiHorizontalRule />
        </>
      )}
      <MDXContent>{children}</MDXContent>
    </div>
  );
}
