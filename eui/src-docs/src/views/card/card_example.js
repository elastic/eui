import React from 'react';

import { renderToHtml } from '../../services';

import {
  GuideSectionTypes,
} from '../../components';

import {
  EuiCode,
  EuiCard,
  EuiCallOut,
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

import CardBeta from './card_beta';
const cardBetaSource = require('!!raw-loader!./card_beta');
const cardBetaHtml = renderToHtml(CardBeta);

import CardLayout from './card_layout';
const cardLayoutSource = require('!!raw-loader!./card_layout');
const cardLayoutHtml = renderToHtml(CardLayout);

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
          By default a card&apos;s title element is a <EuiCode>span</EuiCode>. This can be changed via
          the <EuiCode>titleElement</EuiCode> prop. However, if an <EuiCode>onClick</EuiCode> function is
          also passed, the title element will be forced back to a span.
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
    title: 'Layout',
    source: [{
      type: GuideSectionTypes.JS,
      code: cardLayoutSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: cardLayoutHtml,
    }],
    text: (
      <div>
        <p>
          Most of the time, cards should read from top to bottom (vertical). However, in some cases, you may
          want the icon to be to the left of the content. In this case, add
          the prop <EuiCode>layout=&quot;horizontal&quot;</EuiCode>.
        </p>
        <EuiCallOut
          color="danger"
          title={
            <span>Horizontal layouts <strong>do not</strong> work with images,
            footers or <EuiCode>textAlign</EuiCode>. Therefore, these properties will be ignored.
            </span>
          }
        />
      </div>
    ),
    components: { EuiCard },
    demo: <CardLayout />,
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
        <EuiCallOut
          title={
            <span>Make sure that all images are the <strong>same proportions</strong> when
              used in a singular row.
            </span>
          }
        />
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
  },
  {
    title: 'Beta badge',
    source: [{
      type: GuideSectionTypes.JS,
      code: cardBetaSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: cardBetaHtml,
    }],
    text: (
      <p>
        If the card links to or references a module that is not GA (beta, lab, etc),
        you can add a <EuiCode>betaBadgeLabel</EuiCode> and <EuiCode>betaBadgeTooltipContent</EuiCode> to
        the card and it will properly create and position an <EuiCode>EuiBetaBadge</EuiCode>. If you want to
        change the title of the tooltip, supply a <EuiCode>betaBadgeTitle</EuiCode> prop.
      </p>
    ),
    components: { EuiCard },
    demo: <CardBeta />,
  }],
};
