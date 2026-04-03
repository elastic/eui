/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { EuiCodeBlock, useEuiMemoizedStyles, UseEuiTheme } from '@elastic/eui';
import { css } from '@emotion/react';

export interface DemoSnippetProps {
  snippet: string;
}

const getDemoSnippetStyles = (euiTheme: UseEuiTheme) => ({
  snippet: css`
    border-top: 1px solid var(--docs-demo-border-color);

    &:last-child {
      border-radius: 0 0 calc(var(--docs-demo-border-radius) - 1px)
        calc(var(--docs-demo-border-radius) - 1px);
    }

    .euiCodeBlock__pre {
      padding: ${euiTheme.euiTheme.size.m};
    }
  `,
});

export const DemoSnippet = ({ snippet }: DemoSnippetProps) => {
  const styles = useEuiMemoizedStyles(getDemoSnippetStyles);

  return (
    <EuiCodeBlock
      css={styles.snippet}
      language="tsx"
      fontSize="m"
      paddingSize="none"
      transparentBackground
    >
      {snippet}
    </EuiCodeBlock>
  );
};
