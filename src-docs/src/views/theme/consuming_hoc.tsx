import React from 'react';
import { css } from '@emotion/react';
import { withEuiTheme, WithEuiThemeProps } from '../../../../src/services';
import { EuiIcon } from '../../../../src/components/icon';
import { COLOR_MODE_KEY } from '../../../../src/services/theme/utils';

// eslint-disable-next-line react/prefer-stateless-function
class Block extends React.Component<WithEuiThemeProps> {
  render() {
    const { theme } = this.props;

    const divStyle = css`
      background: ${theme.euiTheme.colors.lightShade};
      padding: ${theme.euiTheme[COLOR_MODE_KEY].size.xl};
      border-radius: ${theme.euiTheme[COLOR_MODE_KEY].border.radius};
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
