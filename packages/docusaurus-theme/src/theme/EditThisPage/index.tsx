import React from 'react';
import { css } from '@emotion/react';
import Translate from '@docusaurus/Translate';
import type { Props } from '@theme-original/EditThisPage';
import { EuiButton, useEuiMemoizedStyles, UseEuiTheme } from '@elastic/eui';
// @ts-ignore - eui only has module declarations for '@elastic/eui/src/themes/amsterdam/global_styling/mixins/button'
// but importing from /src results in "Module not found" error
import { euiButtonColor } from '@elastic/eui/lib/global_styling/mixins/_button';

const getStyles = (theme: UseEuiTheme) => {
  const { euiTheme } = theme;
  const buttonColor = euiButtonColor(theme, 'primary');

  return {
    editPage: css`
      // overriding Docusaurus link hover styles to preserve button styles
      --ifm-link-hover-color: ${buttonColor.color};

      border: ${euiTheme.border.thin};
      border-color: ${euiTheme.colors.primary};
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
