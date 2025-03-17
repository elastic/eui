/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { JSX } from 'react';
import type CodeType from '@theme-init/MDXComponents/Code';
import CodeBlock from '@theme/CodeBlock';
import type { WrapperProps } from '@docusaurus/types';
import { css } from '@emotion/react';
import { EuiCode, useEuiMemoizedStyles, UseEuiTheme } from '@elastic/eui';

type Props = WrapperProps<typeof CodeType>;

const getStyles = ({ euiTheme }: UseEuiTheme) => {
  return {
    code: css`
      // reset docusaurus code styles
      border: none;
      vertical-align: initial;
    `,
  };
};

const Code = ({ children, className, ...rest }: Props): JSX.Element => {
  const styles = useEuiMemoizedStyles(getStyles);
  const language = className?.startsWith('language-')
    ? className.replace('language-', '')
    : undefined;

  const isInlineCode = children
    ? React.Children.toArray(children).every(
        (el) => typeof el === 'string' && !el.includes('\n')
      )
    : false;

  if (isInlineCode) {
    return (
      <EuiCode
        {...rest}
        className={className}
        language={language}
        css={styles.code}
      >
        {children}
      </EuiCode>
    );
  }

  return (
    <CodeBlock className={className} {...rest}>
      {children}
    </CodeBlock>
  );
};

export default Code;
