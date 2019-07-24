import React from 'react';
import { EuiBadge } from '../../../../src/components';

export const ExternalBadge = () => {
  return (
    <EuiBadge
      iconType="popout"
      iconSide="right"
      onClick={() =>
        window.open('https://github.com/elastic/elastic-charts/tree/v8.1.0')
      }>
      External library: elastic-charts v.8.1.0
    </EuiBadge>
  );
};
