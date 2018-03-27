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
    title: 'Basic Card',
    source: [{
      type: GuideSectionTypes.JS,
      code: cardSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: cardHtml,
    }],
    text: (
      <div>
        <p>
          At it&apos;s core an <EuiCode>EuiCard</EuiCode> should contain a <EuiCode>title</EuiCode>,
          <EuiCode>description</EuiCode>, and an <EuiCode>icon</EuiCode>. You can make the whole card
          clickable by giving it an <EuiCode>onClick</EuiCode> handler.
        </p>
        <p>
          By default a card&apos;s content is center aligned. To change the alignment
          set <EuiCode>textAlign</EuiCode> to <EuiCode>left</EuiCode> or <EuiCode>right</EuiCode>.
        </p>
      </div>
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
      <div>
        <p>
          Images can be added in place of, or in conjuction with, icons.
          Just pass a url into the <EuiCode>image</EuiCode> prop and it will expand to to edges of the card.
        </p>
        <p>
          Make sure that all images are the <strong>same proportions</strong> when used in a singular row.
        </p>
      </div>
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
        Footers can contain any number of elements and will always align to the bottom of the card.
        However, if you supply a footer containing a <EuiCode>EuiButton</EuiCode> you <strong>must not</strong> also
        give it an <EuiCode>onClick</EuiCode>.
      </p>
    ),
    components: { EuiCard },
    demo: <CardFooter />,
  }],
};
