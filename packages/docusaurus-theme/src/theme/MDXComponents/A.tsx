/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { JSX } from 'react';
import type AType from '@theme-init/MDXComponents/A';
import type { WrapperProps } from '@docusaurus/types';
import { css } from '@emotion/react';
import { EuiLink, useEuiMemoizedStyles, UseEuiTheme } from '@elastic/eui';

type Props = WrapperProps<typeof AType>;

const getStyles = ({ euiTheme }: UseEuiTheme) => {
  return {
    link: css`
      font-weight: ${euiTheme.font.weight.bold};
      text-decoration: underline;
      text-decoration-color: currentColor;
    `,
  };
};

const A = (props: Props): JSX.Element => {
  const styles = useEuiMemoizedStyles(getStyles);

  return <EuiLink {...props} css={styles.link} />;
};

export default A;
