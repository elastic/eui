import React from 'react';
import { useRouteMatch } from 'react-router';
import { EuiButtonEmpty } from '../../../../src/components/button';

export const ExitStandaloneButton = () => {
  const { path } = useRouteMatch();
  return (
    <EuiButtonEmpty
      href={`#${path.match(/^(?<parent>.*)\/.+$/)?.groups?.parent}`}
      iconType="exit">
      Exit full screen
    </EuiButtonEmpty>
  );
};
