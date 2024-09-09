/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the "Elastic License
 * 2.0", the "GNU Affero General Public License v3.0 only", and the "Server Side
 * Public License v 1"; you may not use this file except in compliance with, at
 * your election, the "Elastic License 2.0", the "GNU Affero General Public
 * License v3.0 only", or the "Server Side Public License, v 1".
 */

import { LiveEditor, LiveError } from 'react-live';
import { css } from '@emotion/react';
import { useEuiMemoizedStyles } from '@elastic/eui';

const getEditorStyles = () => ({
  editor: css`
    font-family: var(--ifm-font-family-monospace);
    border-radius: 0 0 var(--docs-demo-border-radius) var(--docs-demo-border-radius);

    & .prism-code {
      border-radius: 0 0 calc(var(--docs-demo-border-radius) - 1px) calc(var(--docs-demo-border-radius) - 1px);
      max-height: 450px;
      overflow: auto;
    }
  `,
  error: css`
    // docusaurus overrides the default pre styles
    // forcing us to use higher specificity here
    && > pre {
      font-size: var(--eui-font-size-s);
      background: var(--eui-background-color-danger);
      color: var(--eui-color-danger-text);
      padding: var(--eui-size-xs) var(--eui-size-s);
      margin: 0;
      border-radius: 0;
    }
  `,
});

export const DemoEditor = () => {
  const styles = useEuiMemoizedStyles(getEditorStyles);

  return (
    <div css={styles.editor}>
      <div css={styles.error}>
        <LiveError />
      </div>
      <div>
        <LiveEditor tabMode="focus" />
      </div>
    </div>
  );
}
