import React from 'react';
import { EuiSpacer } from '../../../../src/components/spacer';
import { EuiIcon } from '../../../../src/components/icon';
import { EuiCode } from '../../../../src/components/code';
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
          padding: `calc(${theme.sizes.euiSize} * 2)`,
        }}>
        <p>
          The padding of this box is created using <EuiCode>calc()</EuiCode>{' '}
          because EUI&apos;s theme sizes are string pixel values that are
          calculated off the theme&apos;s <EuiCode>base</EuiCode>
        </p>
      </div>
    </div>
  );
};
