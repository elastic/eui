import React from 'react';
import { GuideSectionTypes } from '../../components';

import { EuiCode } from '../../../../src/components';
import WindowProviderDemo from './window_provider';
import { EuiWindowProvider } from '../../../../src/services';
const windowProviderSource = require('!!raw-loader!./window_provider');

export const WindowProviderExample = {
  title: 'Window provider',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.TSX,
          code: windowProviderSource,
        },
      ],
      text: (
        <>
          <p>
            There might be situations when you need to render EUI components
            inside iframes or in another window using React Portals. To ensure
            that target components use the correct <EuiCode>window</EuiCode> and{' '}
            <EuiCode>document</EuiCode> object, use the{' '}
            <strong>EuiWindowProvider</strong> component.
          </p>
        </>
      ),
      demo: <WindowProviderDemo />,
      props: { EuiWindowProvider },
    },
  ],
};
