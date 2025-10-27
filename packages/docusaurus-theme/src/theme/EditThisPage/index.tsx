/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { JSX } from 'react';
import { css } from '@emotion/react';
import Translate from '@docusaurus/Translate';
import type { Props } from '@theme-original/EditThisPage';
import {
  EuiButton,
  euiButtonColor,
  useEuiMemoizedStyles,
  UseEuiTheme,
} from '@elastic/eui';

const getStyles = (theme: UseEuiTheme) => {
  const buttonColor = euiButtonColor(theme, 'primary');

  return {
    editPage: css`
      // overriding Docusaurus link hover styles to preserve button styles
      --ifm-link-hover-color: ${buttonColor.color};
    `,
  };
};

export default function EditThisPage({ editUrl, ...rest }: Props): JSX.Element {
  const styles = useEuiMemoizedStyles(getStyles);

  return (
    <EuiButton
      {...rest}
      href={editUrl}
      iconType="pencil"
      color="primary"
      css={styles.editPage}
    >
      <Translate
        id="theme.common.editThisPage"
        description="The link label to edit the current page"
      >
        Edit this page
      </Translate>
    </EuiButton>
  );
}
