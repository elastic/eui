import React from 'react';
import { EuiSpacer } from '../../../../src/components/spacer';
import { EuiIcon } from '../../../../src/components/icon';
import { EuiCode } from '../../../../src/components/code';
import { EuiText } from '../../../../src/components/text';
import { useEuiTheme } from '../../../../src/services';

export default () => {
  const { euiTheme } = useEuiTheme();
  return (
    <EuiText>
      <p>
        <EuiIcon
          type="stopFilled"
          size="xxl"
          css={{ color: euiTheme.colors.primary }}
        />{' '}
        This primary color will adjust based on the light or dark theme value
      </p>
      <EuiSpacer />
      <div
        css={{
          background: euiTheme.colors.lightShade,
          padding: `calc(${euiTheme.size.base} * 2)`,
        }}
      >
        <p>
          The padding of this box is created using <EuiCode>calc()</EuiCode>{' '}
          because EUI&apos;s theme sizes are string pixel values that are
          calculated off the theme&apos;s <EuiCode>base</EuiCode>
        </p>
      </div>
    </EuiText>
  );
};
