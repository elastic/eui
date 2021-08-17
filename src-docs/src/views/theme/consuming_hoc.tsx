import React from 'react';
import { css } from '@emotion/react';
import { withEuiTheme, WithEuiThemeProps } from '../../../../src/services';
import { EuiIcon } from '../../../../src/components/icon';
import { EuiText } from '../../../../src/components/text';

// eslint-disable-next-line react/prefer-stateless-function
class Block extends React.Component<WithEuiThemeProps> {
  render() {
    const { theme } = this.props;

    const divStyle = css`
      background: ${theme.euiTheme.colors.lightShade};
      padding: ${theme.euiTheme.size.xl};
      border-radius: ${theme.euiTheme.border.radius.medium};
    `;

    return (
      <EuiText css={divStyle}>
        <p>
          <EuiIcon type="faceHappy" /> This box has it&apos;s background,
          padding, and border-radius controlled by custom css
        </p>
      </EuiText>
    );
  }
}

export const ConsumingHOC = withEuiTheme(Block);
