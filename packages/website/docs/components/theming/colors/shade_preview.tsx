import { useEuiTheme, EuiBadge, shade } from '@elastic/eui';
import React from 'react';

export const ShadePreview = () => {
  const { euiTheme } = useEuiTheme();

  return (
    <code>
      shade(
      <EuiBadge color={euiTheme.colors.danger}>
        {euiTheme.colors.danger}
      </EuiBadge>
      , 0.75) ={' '}
      <EuiBadge color={shade(euiTheme.colors.danger, 0.25)}>
        {shade(euiTheme.colors.danger, 0.25)}
      </EuiBadge>
    </code>
  );
};
