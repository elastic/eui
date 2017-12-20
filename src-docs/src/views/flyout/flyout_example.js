import React from 'react';

import { renderToHtml } from '../../services';

import {
  GuideSectionTypes,
} from '../../components';

import {
  EuiCode,
} from '../../../../src/components';

import { Flyout } from './flyout';
const flyoutSource = require('!!raw-loader!./flyout');
const flyoutHtml = renderToHtml(Flyout);

export const FlyoutExample = {
  title: 'Flyout',
  sections: [{
    title: 'Flyout',
    source: [{
      type: GuideSectionTypes.JS,
      code: flyoutSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: flyoutHtml,
    }],
    text: (
      <p>
        Description needed: how to use the <EuiCode>EuiFlyout</EuiCode> component.
      </p>
    ),
    demo: <Flyout />,
  }],
};
