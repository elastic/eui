import React from 'react';
import { useEuiTheme, EuiBadge, transparentize } from '@elastic/eui';

export const TransparentizePreview = () => {
  const { euiTheme, colorMode } = useEuiTheme();

  return (
    <code>
      transparentize(
      <EuiBadge color={'#006837'}>#006837</EuiBadge>, 0.75) ={' '}
      <EuiBadge
        color={transparentize('#006837', 0.25)}
        style={{
          color:
            colorMode === 'DARK' ? euiTheme.colors.ghost : euiTheme.colors.ink,
        }}
      >
        {transparentize('#006837', 0.25)}
      </EuiBadge>
    </code>
  );
};
