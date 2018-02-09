import React from 'react';

import { renderToHtml } from '../../services';

import {
  GuideSectionTypes,
} from '../../components';

import {
  EuiCode,
  EuiCard,
} from '../../../../src/components';

import Card from './card';
const cardSource = require('!!raw-loader!./card');
const cardHtml = renderToHtml(Card);

export const CardExample = {
  title: 'Card',
  sections: [{
    title: 'Card',
    source: [{
      type: GuideSectionTypes.JS,
      code: cardSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: cardHtml,
    }],
    text: (
      <p>
        Description needed: how to use the <EuiCode>EuiCard</EuiCode> component.
      </p>
    ),
    components: { EuiCard },
    demo: <Card />,
  }],
};
