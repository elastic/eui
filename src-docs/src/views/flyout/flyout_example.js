import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { GuideSectionTypes } from '../../components';

import {
  EuiCode,
  EuiFlyout,
  EuiFlyoutBody,
  EuiFlyoutHeader,
  EuiFlyoutFooter,
  EuiCallOut,
} from '../../../../src/components';

import Flyout from './flyout';
const flyoutSource = require('!!raw-loader!./flyout');

import FlyoutComplicated from './flyout_complicated';
const flyoutComplicatedSource = require('!!raw-loader!./flyout_complicated');

import FlyoutSmall from './flyout_small';
const flyoutSmallSource = require('!!raw-loader!./flyout_small');

import FlyoutLarge from './flyout_large';
const flyoutLargeSource = require('!!raw-loader!./flyout_large');

import FlyoutPaddingMedium from './flyout_padding_medium';
const FlyoutPaddingMediumSource = require('!!raw-loader!./flyout_padding_medium');

import FlyoutMaxWidth from './flyout_max_width';
const flyoutMaxWidthSource = require('!!raw-loader!./flyout_max_width');

import FlyoutWithBanner from './flyout_banner';
const flyoutWithBannerSource = require('!!raw-loader!./flyout_banner');

const flyOutSnippet = `<EuiFlyout ownFocus onClose={closeFlyout}>
  <EuiFlyoutHeader hasBorder aria-labelledby={flyoutHeadingId}>
    <EuiTitle>
      <h2 id={flyoutHeadingId}><!-- Defaults to medium size. Change the heading level based on your context. --></h2>
    </EuiTitle>
  </EuiFlyoutHeader>
  <EuiFlyoutBody>
    <!-- Flyout body content -->
  </EuiFlyoutBody>
</EuiFlyout>
`;

const flyoutComplicatedSnippet = `<EuiFlyout ownFocus onClose={closeFlyout}>
  <EuiFlyoutHeader hasBorder aria-labelledby={flyoutHeadingId}>
    <EuiTitle>
      <h2 id={flyoutHeadingId}><!-- Defaults to medium size. Change the heading level based on your context. --></h2>
    </EuiTitle>
  </EuiFlyoutHeader>
  <EuiFlyoutBody>
    <!-- Long content can be placed here -->
  </EuiFlyoutBody>
  <EuiFlyoutFooter>
    <EuiFlexGroup justifyContent="spaceBetween">
      <EuiFlexItem grow={false}><!-- FlexItem content --></EuiFlexItem>
      <EuiFlexItem grow={false}><!-- FlexItem content --></EuiFlexItem>
    </EuiFlexGroup>
  </EuiFlyoutFooter>
</EuiFlyout>
`;

const flyoutSmallSnippet = `<EuiFlyout size="s" onClose={closeFlyout}>
  <EuiFlyoutHeader hasBorder aria-labelledby={flyoutHeadingId}>
    <EuiTitle>
      <h2 id={flyoutHeadingId}><!-- Defaults to medium size. Change the heading level based on your context. --></h2>
    </EuiTitle>
  </EuiFlyoutHeader>
  <EuiFlyoutBody>
    <!-- Flyout body content -->
  </EuiFlyoutBody>
</EuiFlyout>
`;

const flyoutMediumPaddingSnippet = `<EuiFlyout paddingSize="m" onClose={closeFlyout}>
  <EuiFlyoutHeader hasBorder aria-labelledby={flyoutHeadingId}>
    <EuiTitle>
      <h2 id={flyoutHeadingId}>
        <!-- Defaults to medium size. Change the heading level based on your context. -->
      </h2>
    </EuiTitle>
  </EuiFlyoutHeader>
  <EuiFlyoutBody>
    <!-- Flyout body content -->
  </EuiFlyoutBody>
</EuiFlyout>
`;

const flyoutMaxWidthSnippet = `<EuiFlyout ownFocus maxWidth={448} onClose={closeFlyout}>
  <EuiFlyoutHeader hasBorder aria-labelledby={flyoutHeadingId}>
    <EuiTitle>
      <h2 id={flyoutHeadingId}><!-- Defaults to medium size. Change the heading level based on your context. --></h2>
    </EuiTitle>
  </EuiFlyoutHeader>
  <EuiFlyoutBody>
    <!-- Flyout body content -->
  </EuiFlyoutBody>
</EuiFlyout>
`;

const flyoutLargeSnippet = `<EuiFlyout ownFocus size="l" onClose={closeFlyout}>
  <EuiFlyoutHeader hasBorder aria-labelledby={flyoutHeadingId}>
    <EuiTitle>
      <h2 id={flyoutHeadingId}><!-- Defaults to medium size. Change the heading level based on your context. --></h2>
    </EuiTitle>
  </EuiFlyoutHeader>
  <EuiFlyoutBody>
    <!-- Flyout body content -->
  </EuiFlyoutBody>
</EuiFlyout>
`;

const flyoutWithBannerSnippet = `<EuiFlyout ownFocus onClose={closeFlyout}>
  <EuiFlyoutHeader hasBorder aria-labelledby={flyoutHeadingId}>
    <EuiTitle>
      <h2 id={flyoutHeadingId}><!-- Defaults to medium size. Change the heading level based on your context. --></h2>
    </EuiTitle>
  </EuiFlyoutHeader>
  <EuiFlyoutBody banner={callOut}>
    <!-- Flyout body content -->
  </EuiFlyoutBody>
</EuiFlyout>
`;

export const FlyoutExample = {
  title: 'Flyout',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: flyoutSource,
        },
      ],
      text: (
        <>
          <p>
            <strong>EuiFlyout</strong> is a fixed position panel that pops in
            from the right side of the screen. It should be used to reveal more
            detailed contextual information or to provide complex forms without
            losing the user&apos;s current state. It is a good alternative to{' '}
            <Link to="/layout/modal">modals</Link> when the action is not
            transient.
          </p>
          <p>
            Like modals, you control the visibilty of the flyout using your own
            state management, but <strong>EuiFlyout</strong> requires an{' '}
            <EuiCode>onClose</EuiCode> handler for it&apos;s internal dismiss
            buttons.
          </p>

          <EuiCallOut
            iconType="accessibility"
            title={
              <>
                Use <EuiCode>{'aria-labelledby={headingId}'}</EuiCode> and{' '}
                <EuiCode>ownFocus</EuiCode> to announce the flyout to screen
                readers.
              </>
            }
          />
        </>
      ),
      props: { EuiFlyout },
      snippet: flyOutSnippet,
      demo: <Flyout />,
    },
    {
      title: 'More complicated flyout',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: flyoutComplicatedSource,
        },
      ],
      text: (
        <>
          <p>
            This component also comes with related child components for ease of
            creating headers, footers and scrolling body content.{' '}
            <strong>EuiFlyoutHeader</strong> and{' '}
            <strong>EuiFlyoutFooter</strong> are pinned to the top and bottom of
            the flyout, respectively, to allow for always visible navigation and
            actions. The <strong>EuiFlyoutBody</strong> component will then
            automatically overflow.
          </p>
        </>
      ),
      props: { EuiFlyoutHeader, EuiFlyoutBody, EuiFlyoutFooter },
      snippet: flyoutComplicatedSnippet,
      demo: <FlyoutComplicated />,
    },
    {
      title: 'Sizing',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: flyoutLargeSource,
        },
      ],
      text: (
        <p>
          Flyouts come in three predefined <EuiCode>size</EuiCode>s,{' '}
          <EuiCode>{"'x' | 'm' | 'l'"}</EuiCode>, which define the width
          relative to the window size with a minimum width defined in pixels.
        </p>
      ),
      snippet: flyoutLargeSnippet,
      demo: <FlyoutLarge />,
      props: { EuiFlyout },
    },
    {
      title: 'Adjusting padding',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: FlyoutPaddingMediumSource,
        },
      ],
      text: (
        <p>
          All the inner flyout components inherit their padding from the
          wrapping <strong>EuiFlyout</strong> component. This ensures that all
          the horizontal edges line up no matter the{' '}
          <EuiCode>paddingSize</EuiCode>. When using the{' '}
          <EuiCode>{'"none"'}</EuiCode> size, you will need to accomodate your
          content with some other way of creating distance to the edges of the
          flyout.
        </p>
      ),
      snippet: flyoutMediumPaddingSnippet,
      demo: <FlyoutPaddingMedium />,
      props: { EuiFlyout },
    },
    {
      title: 'Adding a banner',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: flyoutWithBannerSource,
        },
      ],
      text: (
        <p>
          To highlight some information at the top of a flyout, you can pass an{' '}
          <Link to="/display/callout">
            <strong>EuiCallOut</strong>
          </Link>{' '}
          to the <EuiCode>banner</EuiCode> prop available in{' '}
          <strong>EuiFlyoutBody</strong> and its layout will adjust
          appropriately.
        </p>
      ),
      snippet: flyoutWithBannerSnippet,
      demo: <FlyoutWithBanner />,
      props: { EuiFlyoutBody },
    },
    {
      title: 'Without ownFocus',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: flyoutSmallSource,
        },
      ],
      text: (
        <>
          <p>
            Like modals, you can, and usually want to, obscure the page content
            beneath with <EuiCode>ownFocus</EuiCode> which adds an{' '}
            <Link to="/utilities/overlay-mask">
              <strong>EuiOverlayMask</strong>
            </Link>
            . By not adding this prop, the the underlying page content will be
            visible and clickable.
          </p>
        </>
      ),
      snippet: flyoutSmallSnippet,
      demo: <FlyoutSmall />,
      props: { EuiFlyout },
    },
    {
      title: 'Understanding max-width',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: flyoutMaxWidthSource,
        },
      ],
      text: (
        <Fragment>
          <p>
            By default, flyouts will continue to grow with the width of the
            window. To stop this growth at an ideal width, set{' '}
            <EuiCode>maxWidth</EuiCode> to <EuiCode>true</EuiCode>, or pass your
            own custom size.
          </p>
          <EuiCallOut
            color="warning"
            title="Note that there are some caveats to providing a maxWidth that is smaller than the minWidth."
          />
        </Fragment>
      ),
      snippet: flyoutMaxWidthSnippet,
      demo: <FlyoutMaxWidth />,
      props: { EuiFlyout },
    },
  ],
};
