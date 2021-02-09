import React from 'react';
import { EuiSpacer } from '../../../../src/components/spacer';
import { EuiIcon } from '../../../../src/components/icon';
import { useEuiTheme } from '../../../../src/services';

export default () => {
  const [theme] = useEuiTheme();
  return (
    <div>
      <p>
        <EuiIcon
          type="stopFilled"
          size="xxl"
          css={{ color: theme.colors.euiColorPrimary }}
        />{' '}
        This primary color will adjust based on the light or dark theme value
      </p>
      <EuiSpacer />
      <div
        css={{
          background: theme.colors.euiColorLightShade,
          padding: theme.sizes.euiSizeXL,
        }}>
        <p>
          The padding of this box is passed as a raw unit translated to pixels
        </p>
      </div>
    </div>
  );
};
