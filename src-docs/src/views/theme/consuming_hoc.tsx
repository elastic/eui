import React from 'react';
import { css } from '@emotion/react';
import { withEuiTheme } from '../../../../src/services';

// eslint-disable-next-line react/prefer-stateless-function
class Block extends React.Component<any> {
  render() {
    const { theme } = this.props;

    const divStyle = css`
      background: ${theme.theme.colors.euiColorLightShade};
      padding: ${theme.theme.sizes.euiSizeXL};
      border-radius: ${theme.theme.borders.euiBorderRadius};
    `;

    return (
      <div css={divStyle}>
        <p>
          This box has it&apos;s background, padding, and border-radius
          controlled by custom css
        </p>
      </div>
    );
  }
}

export const ConsumingHOC = withEuiTheme(Block);
