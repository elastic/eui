import React from 'react';
import { css } from '@emotion/react';
import { withEuiTheme, WithEuiThemeProps } from '../../../../src/services';
import { EuiIcon } from '../../../../src/components/icon';

// eslint-disable-next-line react/prefer-stateless-function
class Block extends React.Component<WithEuiThemeProps> {
  render() {
    const { theme } = this.props;

    const divStyle = css`
      background: ${theme.euiTheme.colors.euiColorLightShade};
      padding: ${theme.euiTheme.sizes.euiSizeXL};
      border-radius: ${theme.euiTheme.borders.euiBorderRadius};
    `;

    return (
      <div css={divStyle}>
        <p>
          <EuiIcon type="faceHappy" /> This box has it&apos;s background,
          padding, and border-radius controlled by custom css
        </p>
      </div>
    );
  }
}

export const ConsumingHOC = withEuiTheme(Block);
