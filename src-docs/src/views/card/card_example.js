import React, { Fragment } from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  EuiCode,
  EuiCard,
  EuiCallOut,
  EuiCheckableCard,
} from '../../../../src/components';
import cardConfig from './playground';

import { EuiCardSelect } from '../../../../src/components/card/card_select';

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

import CardSelectable from './card_selectable';
const cardSelectableSource = require('!!raw-loader!./card_selectable');
const cardSelectableHtml = renderToHtml(CardSelectable);

import CardChildren from './card_children';
const cardChildrenSource = require('!!raw-loader!./card_children');
const cardChildrenHtml = renderToHtml(CardChildren);

import CardCheckable from './card_checkable';
const cardCheckableSource = require('!!raw-loader!./card_checkable');
const cardCheckableHtml = renderToHtml(CardCheckable);

import CardDisplay from './card_display';
const cardDisplaySource = require('!!raw-loader!./card_display');
const cardDisplayHtml = renderToHtml(CardDisplay);

export const CardExample = {
  title: 'Card',
  sections: [
    {
      title: 'Basic card',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: cardSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: cardHtml,
        },
      ],
      text: (
        <div>
          <p>
            At its core an <strong>EuiCard</strong> should contain a{' '}
            <EuiCode>title</EuiCode>,<EuiCode>description</EuiCode>, and an{' '}
            <EuiCode>icon</EuiCode>. You can make the whole card clickable by
            giving it an <EuiCode>onClick</EuiCode> handler or{' '}
            <EuiCode>href</EuiCode>.
          </p>
          <p>
            For accessibility and heading hierarchy, a card&apos;s title element
            is a <EuiCode>span</EuiCode> by default. However, this can be
            changed via the <EuiCode>titleElement</EuiCode> prop without
            altering the visual size.
          </p>
        </div>
      ),
      props: { EuiCard },
      demo: <Card />,
      snippet: `<EuiCard
  icon={icon}
  title="title"
  description="description"
  onClick={handleClick}
/>`,
    },
    {
      title: 'Layout',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: cardLayoutSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: cardLayoutHtml,
        },
      ],
      text: (
        <div>
          <p>
            Most of the time, cards should read from top to bottom (vertical).
            However, in some cases, you may want the icon to be to the left of
            the content. In this case, add the prop{' '}
            <EuiCode language="js">layout=&quot;horizontal&quot;</EuiCode>.
            Works best when the icon is size <EuiCode>xl</EuiCode>.
          </p>
          <EuiCallOut
            color="danger"
            title={
              <span>
                Horizontal layouts <strong>do not</strong> work with images,
                footers, or <EuiCode>textAlign</EuiCode>. Therefore, these
                properties will be ignored.
              </span>
            }
          />
        </div>
      ),
      props: { EuiCard },
      demo: <CardLayout />,
      snippet: `<EuiCard
  layout="horizontal"
  icon={icon}
  title="title"
  description="description"
  onClick={handleClick}
/>`,
    },
    {
      title: 'Images',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: cardImageSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: cardImageHtml,
        },
      ],
      text: (
        <div>
          <p>
            Images can be added in place of, or in conjuction with, icons. Just
            pass a url into the <EuiCode>image</EuiCode> prop and it will expand
            to the edges of the card.
          </p>
          <EuiCallOut
            title={
              <span>
                Make sure that all images are the{' '}
                <strong>same proportions</strong> when used in a singular row.
              </span>
            }>
            <p>
              Also, when passing an <strong>element</strong> to the{' '}
              <EuiCode>image</EuiCode> prop that consists solely of inline
              elements or does not contain an
              <EuiCode>{'<img />'}</EuiCode> element, each element will require
              a style of <EuiCode>width: 100%</EuiCode>.
            </p>
          </EuiCallOut>
        </div>
      ),
      props: { EuiCard },
      demo: <CardImage />,
      snippet: `<EuiCard
  textAlign="left"
  image="https://source.unsplash.com/400x200/?Nature"
  title="title"
  description="description"
  onClick={handleClick}
/>`,
    },
    {
      title: 'Footer',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: cardFooterSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: cardFooterHtml,
        },
      ],
      text: (
        <>
          <p>
            Footers can contain any number of elements and will always align to
            the bottom of the card. However, if you supply a footer containing a{' '}
            <strong>EuiButton</strong> you <strong>must not</strong> also give
            it an <EuiCode>onClick</EuiCode>.
          </p>
          <EuiCallOut
            iconType="accessibility"
            color="warning"
            title={
              <span>
                When using footers to display generic &quot;Go&quot; buttons,
                you must provide an <EuiCode>aria-label</EuiCode> to the button
                itself that refers back to the title of the card.
              </span>
            }
          />
        </>
      ),
      components: { EuiCard },
      demo: <CardFooter />,
      snippet: `<EuiCard
  icon={icon}
  title="title"
  description="description"
  footer={footer}
/>`,
    },
    {
      title: 'Beta badge',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: cardBetaSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: cardBetaHtml,
        },
      ],
      text: (
        <p>
          If the card links to or references a module that is not GA (beta, lab,
          etc), you can add a <EuiCode>betaBadgeLabel</EuiCode> and{' '}
          <EuiCode>betaBadgeTooltipContent</EuiCode> to the card and it will
          properly create and position an <strong>EuiBetaBadge</strong>. If you
          want to change the title of the tooltip, supply a{' '}
          <EuiCode>betaBadgeTitle</EuiCode> prop.
        </p>
      ),
      props: { EuiCard },
      demo: <CardBeta />,
      snippet: `<EuiCard
  icon={icon}
  title="title"
  description="description"
  onClick={handleClick}
  betaBadgeLabel="betaBadgeLabel"
  betaBadgeTooltipContent={betaBadgeTooltipContent}
/>`,
    },
    {
      title: 'Selectable',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: cardSelectableSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: cardSelectableHtml,
        },
      ],
      text: (
        <Fragment>
          <p>
            When you have a list of cards that can be selected but{' '}
            <strong>do not navigate anywhere</strong>, you can add the{' '}
            <EuiCode>selectable</EuiCode> prop. The prop is an object that
            extends <strong>EuiButtonEmpty</strong>. It will apply the button as
            seen below, and passing{' '}
            <EuiCode language="js">selectable.isSelected=true</EuiCode> will
            alter the styles of the card and button to look selected.
          </p>
          <EuiCallOut
            color="warning"
            title="When providing an extra link to more details or such, be sure to
            stop event propagation from also selecting the card."
          />
        </Fragment>
      ),
      props: { EuiCardSelect },
      demo: <CardSelectable />,
      snippet: `<EuiCard
  icon={icon}
  title="title"
  description="description"
  selectable={{
    onClick: cardClicked,
    isSelected: cardIsSelected,
    isDisabled: cardIsDisabled,
  }}
  footer={footer}
/>`,
    },
    {
      title: 'Checkable',
      text: (
        <Fragment>
          <p>
            <strong>EuiCheckableCard</strong> wraps an <strong>EuiRadio</strong>{' '}
            or <strong>EuiCheckbox</strong> with a more-prominent panel,
            allowing for children to be displayed.
          </p>
          <EuiCallOut
            iconType="accessibility"
            color="warning"
            title={
              <span>
                When used as a radio group, you must provide a{' '}
                <EuiCode>fieldset</EuiCode> with a <EuiCode>legend</EuiCode> for
                accessibility.
              </span>
            }
          />
        </Fragment>
      ),
      source: [
        {
          type: GuideSectionTypes.JS,
          code: cardCheckableSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: cardCheckableHtml,
        },
      ],
      props: {
        EuiCheckableCard,
      },
      demo: <CardCheckable />,
    },
    {
      title: 'Custom children',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: cardChildrenSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: cardChildrenHtml,
        },
      ],
      text: (
        <Fragment>
          <p>
            In the event that you need more than just paragraph text for the
            description, you can pass anything you need as the{' '}
            <EuiCode>children</EuiCode> of the component.
          </p>
        </Fragment>
      ),
      props: { EuiCard },
      demo: <CardChildren />,
      snippet: `<EuiCard
  textAlign="left"
  title="title"
  description="description">
  <EuiText size="s">
    <ul>
      <li>Bullet 1</li>
      <li>Bullet 2</li>
      <li>Bullet 3</li>
    </ul>
  </EuiText>
</EuiCard>`,
    },
    {
      title: 'Plain cards',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: cardDisplaySource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: cardDisplayHtml,
        },
      ],
      text: (
        <Fragment>
          <p>
            If you need a card with no borders or shadows pass{' '}
            <EuiCode language="ts">{'display="plain"'}</EuiCode>. This is a good
            option to avoid nested panels. Adding an interaction to the card
            will provide the clickable styling on hover. Note that{' '}
            <EuiCode>plain</EuiCode> display is not available for
            <EuiCode>selectable</EuiCode> cards.
          </p>
          <p>
            For non-interactive cards, reduce or eliminate the padding as needed
            to suit your layout with the prop <EuiCode>paddingSize</EuiCode>.
          </p>
        </Fragment>
      ),
      props: { EuiCard },
      demo: <CardDisplay />,
      snippet: `<EuiCard
  title="title"
  description="description" 
  display="plain"
/>`,
    },
  ],
  playground: cardConfig,
};
