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

import CardImage from './card_image';
const cardImageSource = require('!!raw-loader!./card_image');
const cardImageHtml = renderToHtml(CardImage);

import CardFooter from './card_footer';
const cardFooterSource = require('!!raw-loader!./card_footer');
const cardFooterHtml = renderToHtml(CardFooter);

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
    props: { EuiCard },
    demo: <Card />,
  },
  {
    title: 'Images',
    source: [{
      type: GuideSectionTypes.JS,
      code: cardImageSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: cardImageHtml,
    }],
    text: (
      <p>
        Description needed: how to use the <EuiCode>EuiCard</EuiCode> component.
      </p>
    ),
    components: { EuiCard },
    demo: <CardImage />,
  },
  {
    title: 'Footer',
    source: [{
      type: GuideSectionTypes.JS,
      code: cardFooterSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: cardFooterHtml,
    }],
    text: (
      <p>
        Description needed: how to use the <EuiCode>EuiCard</EuiCode> component.
      </p>
    ),
    components: { EuiCard },
    demo: <CardFooter />,
  }],
};
