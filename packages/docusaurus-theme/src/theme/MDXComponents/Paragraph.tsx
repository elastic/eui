/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { HTMLAttributes } from 'react';
import { EuiText, useEuiMemoizedStyles } from '@elastic/eui';
import { css } from '@emotion/react';

const getParagraphStyles = () => css`
  margin-block: var(--eui-theme-content-vertical-spacing);

  &:first-child {
    margin-block-start: 0;
  }

  &:last-child {
    margin-block-end: 0;
  }
`;

export const Paragraph = ({ children }: HTMLAttributes<HTMLParagraphElement>) => {
  const styles = useEuiMemoizedStyles(getParagraphStyles);

  return (
    <EuiText size="m" css={styles} component="p">
      {children}
    </EuiText>
  );
};
