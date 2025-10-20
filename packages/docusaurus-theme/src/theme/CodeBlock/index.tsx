/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { isValidElement, type ReactNode, JSX } from 'react';
import { css } from '@emotion/react';
import { EuiCodeBlock } from '@elastic/eui';
import type { Props } from '@theme/CodeBlock';

import { Demo } from '../../components/demo';

/**
 * Best attempt to make the children a plain string so it is copyable. If there
 * are react elements, we will not be able to copy the content, and it will
 * return `children` as-is; otherwise, it concatenates the string children
 * together.
 */
function maybeStringifyChildren(children: ReactNode): ReactNode {
  if (React.Children.toArray(children).some((el) => isValidElement(el))) {
    return children;
  }
  // The children is now guaranteed to be one/more plain strings
  return Array.isArray(children) ? children.join('') : (children as string);
}

export default function CodeBlock({
  children: rawChildren,
  metastring,
  className,
  ...props
}: Props): JSX.Element {
  const children = maybeStringifyChildren(rawChildren);
  const language = className?.replace('language-', '') || undefined;

  if (metastring?.startsWith('interactive')) {
    return <Demo {...props}>{children}</Demo>;
  }

  return (
    <EuiCodeBlock
      {...props}
      fontSize="m"
      overflowHeight={450}
      language={language}
      isCopyable
      css={css`
        word-break: break-word;
      `}
    >
      {children}
    </EuiCodeBlock>
  );
}
