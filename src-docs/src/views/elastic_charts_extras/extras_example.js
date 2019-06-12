import React from 'react';

import { EuiCode } from '../../../../src/components';

import { Axes } from './axes';
import { Grid } from './grid';
import { Crosshair } from './crosshair';

export const ElasticChartsExtrasExample = {
  title: 'Extras',
  sections: [
    {
      title: 'Axes',
      text: (
        <p>
          Description needed: how to use the <EuiCode>Axes</EuiCode> component.
        </p>
      ),
      demo: <Axes />,
    },
    {
      title: 'Grid',
      text: (
        <p>
          Description needed: how to use the <EuiCode>Grid</EuiCode> component.
        </p>
      ),
      demo: <Grid />,
    },
    {
      title: 'Crosshair',
      text: (
        <p>
          Description needed: how to use the <EuiCode>Crosshair</EuiCode>{' '}
          component.
        </p>
      ),
      demo: <Crosshair />,
    },
  ],
};
