import React, { Fragment } from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { EuiCode, EuiCard, EuiCallOut } from '../../../../src/components';

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

export const CardExample = {
  title: 'Card',
  sections: [
    {
      title: 'Basic Card',
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
            At its core an <EuiCode>EuiCard</EuiCode> should contain a{' '}
            <EuiCode>title</EuiCode>,<EuiCode>description</EuiCode>, and an{' '}
            <EuiCode>icon</EuiCode>. You can make the whole card clickable by
            giving it an <EuiCode>onClick</EuiCode> handler or{' '}
            <EuiCode>href</EuiCode>.
          </p>
          <p>
            For accessibility and heading heirarchy, a card&apos;s title element
            is a <EuiCode>span</EuiCode> by default. However, this can be
            changed via the <EuiCode>titleElement</EuiCode> prop without
            altering the visual size..
          </p>
        </div>
      ),
      props: { EuiCard },
      demo: <Card />,
      snippet: `<EuiCard
  icon={<EuiIcon size="xxl" type={} />}
  title=""
  description=""
  onClick={}
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
            <EuiCode>layout=&quot;horizontal&quot;</EuiCode>. Works best when
            the icon is size <EuiCode>xl</EuiCode>.
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
  icon={<EuiIcon size="xl" type={} />}
  title=""
  description=""
  onClick={}
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
            }
          />
        </div>
      ),
      props: { EuiCard },
      demo: <CardImage />,
      snippet: `<EuiCard
  textAlign="left"
  image="https://source.unsplash.com/400x200/?Nature"
  title=""
  description=""
  onClick={}
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
            <EuiCode>EuiButton</EuiCode> you <strong>must not</strong> also give
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
  icon={<EuiIcon size="xxl" type="" />}
  title=""
  description=""
  footer={
    <div>
      <EuiButton aria-label=""></EuiButton>
      <EuiSpacer size="xs" />
      <EuiText size="s">
        <p>
          Or try <EuiLink href="">this</EuiLink>
        </p>
      </EuiText>
    </div>
  }
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
          properly create and position an <EuiCode>EuiBetaBadge</EuiCode>. If
          you want to change the title of the tooltip, supply a{' '}
          <EuiCode>betaBadgeTitle</EuiCode> prop.
        </p>
      ),
      props: { EuiCard },
      demo: <CardBeta />,
      snippet: `<EuiCard
  icon={<EuiIcon size="xxl" type={} />}
  title=""
  description=""
  onClick={}
  betaBadgeLabel=""
  betaBadgeTooltipContent=""
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
            extends <EuiCode>EuiButtonEmpty</EuiCode>. It will apply the button
            as seen below, and passing{' '}
            <EuiCode>selectable.isSelected = true</EuiCode> will alter the
            styles of the card and button to look selected.
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
  icon={<EuiIcon />}
  title=""
  description=""
  selectable={{
    onClick: this.cardClicked,
    isSelected: this.state.cardIsSelected,
    isDisabled: this.state.cardIsDisabled,
  }}
  footer={<EuiButtonEmpty
    onClick={e => {
      e.stopPropagation();
    }}
    aria-label=""
  />}
/>`,
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
  title=""
  description="">
  <EuiText size="s">
    <ul>
      <li>Bullet 1</li>
      <li>Bullet 2</li>
      <li>Bullet 3</li>
    </ul>
  </EuiText>
</EuiCard>`,
    },
  ],
};
