import React from 'react';
import { Link } from 'react-router-dom';

import { GuideSectionTypes } from '../../components';

import {
  EuiCode,
  EuiFlyout,
  EuiFlyoutBody,
  EuiFlyoutHeader,
  EuiFlyoutFooter,
  EuiFlyoutResizable,
  EuiCallOut,
  EuiLink,
} from '../../../../src/components';

import Flyout from './flyout';
const flyoutSource = require('!!raw-loader!./flyout');

import FlyoutComplicated from './flyout_complicated';
const flyoutComplicatedSource = require('!!raw-loader!./flyout_complicated');

import FlyoutOwnFocus from './flyout_own_focus';
const flyoutOwnFocusSource = require('!!raw-loader!./flyout_own_focus');

import FlyoutSizes from './flyout_sizes';
const flyoutSizesSource = require('!!raw-loader!./flyout_sizes');

import FlyoutPaddingSizes from './flyout_padding_sizes';
const FlyoutPaddingSizesSource = require('!!raw-loader!./flyout_padding_sizes');

import FlyoutMaxWidth from './flyout_max_width';
const flyoutMaxWidthSource = require('!!raw-loader!./flyout_max_width');

import FlyoutWithBanner from './flyout_banner';
const flyoutWithBannerSource = require('!!raw-loader!./flyout_banner');

import FlyoutPush from './flyout_push';
const flyoutPushSource = require('!!raw-loader!./flyout_push');

import FlyoutResizable from './flyout_resizable';
const flyoutResizableSource = require('!!raw-loader!./flyout_resizable');

const flyOutSnippet = `<EuiFlyout onClose={closeFlyout}>
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

const flyoutComplicatedSnippet = `<EuiFlyout onClose={closeFlyout}>
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

const flyoutOwnFocusSnippet = `<EuiFlyout ownFocus={false} size="s" onClose={closeFlyout}>
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

const flyoutSizesPaddingSnippet = `<EuiFlyout paddingSize="m" onClose={closeFlyout}>
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

const flyoutMaxWidthSnippet = `<EuiFlyout maxWidth={448} onClose={closeFlyout}>
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

const flyoutSizesSnippet = `<EuiFlyout size="l" onClose={closeFlyout}>
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

const flyoutWithBannerSnippet = `<EuiFlyout onClose={closeFlyout}>
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

const flyoutPushedSnippet = `<EuiFlyout type="push" onClose={closeFlyout}>
  <EuiFlyoutHeader hasBorder aria-labelledby={flyoutHeadingId}>
    <EuiTitle>
      <h2 id={flyoutHeadingId}><!-- Defaults to medium size. Change the heading level based on your context. --></h2>
    </EuiTitle>
  </EuiFlyoutHeader>
  <EuiFlyoutBody>
    <!-- Flyout body content -->
  </EuiFlyoutBody>
  <EuiFlyoutFooter>
    <EuiButton onClose={closeFlyout}>Close</EuiButton>
  </EuiFlyoutFooter>
</EuiFlyout>
`;

const flyoutResizableSnippet = `<EuiFlyoutResizable onClose={closeFlyout} maxWidth={1000} minWidth={300}>
  <EuiFlyoutHeader hasBorder aria-labelledby={flyoutHeadingId}>
    <EuiTitle>
      <h2 id={flyoutHeadingId}>Flyout title</h2>
    </EuiTitle>
  </EuiFlyoutHeader>
  <EuiFlyoutBody>
    <!-- Flyout content -->
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
            from the side of the window. It should be used to reveal more
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
                Use <EuiCode>{'aria-labelledby={headingId}'}</EuiCode> to
                announce the flyout to screen readers.
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
          type: GuideSectionTypes.TSX,
          code: flyoutSizesSource,
        },
      ],
      text: (
        <p>
          Flyouts come in three predefined <EuiCode>size</EuiCode>s of{' '}
          <EuiCode>{"'s' | 'm' | 'l'"}</EuiCode>, which define the width{' '}
          <strong>relative to the window size</strong> with a minimum width
          defined in pixels. You can otherwise supply your own fixed width in
          number or string format.
        </p>
      ),
      snippet: flyoutSizesSnippet,
      demo: <FlyoutSizes />,
      props: { EuiFlyout },
    },
    {
      title: 'Adjusting padding',
      source: [
        {
          type: GuideSectionTypes.TSX,
          code: FlyoutPaddingSizesSource,
        },
      ],
      text: (
        <p>
          All the inner flyout components inherit their padding from the
          wrapping <strong>EuiFlyout</strong> component. This ensures that all
          the horizontal edges line up no matter the{' '}
          <EuiCode>paddingSize</EuiCode>. When using the{' '}
          <EuiCode>{'"none"'}</EuiCode> size, you will need to accommodate your
          content with some other way of creating distance to the edges of the
          flyout.
        </p>
      ),
      snippet: flyoutSizesPaddingSnippet,
      demo: <FlyoutPaddingSizes />,
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
          code: flyoutOwnFocusSource,
        },
      ],
      text: (
        <>
          <p>
            Like modals, you will usually want to obscure the page content
            beneath with <EuiCode>ownFocus</EuiCode> which wraps the flyout with
            an{' '}
            <Link to="/utilities/overlay-mask">
              <strong>EuiOverlayMask</strong>
            </Link>{' '}
            . However, there are use-cases where flyouts present more
            information or controls, but need to maintain the interactions of
            the page content. By setting{' '}
            <EuiCode language="js">{'ownFocus={false}'}</EuiCode>, the
            underlying page content will be visible and clickable.
          </p>
        </>
      ),
      snippet: flyoutOwnFocusSnippet,
      demo: <FlyoutOwnFocus />,
      props: { EuiFlyout },
    },
    {
      title: 'Push versus overlay',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: flyoutPushSource,
        },
      ],
      text: (
        <>
          <p>
            Another way to allow for continued interactions of the page content
            while a flyout is visible, is to change the <EuiCode>type</EuiCode>{' '}
            from <EuiCode>overlay</EuiCode> to <EuiCode>push</EuiCode>.
          </p>
          <p>
            A pushed flyout still positions itself as <EuiCode>fixed</EuiCode>,
            but adds padding to the document&apos;s body element to accommodate
            for the flyout&apos;s width. Because this squishes the page content,
            the flyout changes back to <EuiCode>overlay</EuiCode> at smaller
            window widths. You can adjust this minimum breakpoint with{' '}
            <EuiCode>pushMinBreakpoint</EuiCode>.
          </p>
          <EuiCallOut
            iconType="accessibility"
            title="Push flyouts require manual accessibility management"
            color="warning"
          >
            <p>
              Push flyouts do not use a focus trap, do not close on Escape
              keypress, do not inherit a{' '}
              <EuiLink
                href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/dialog_role"
                target="_blank"
              >
                dialog role
              </EuiLink>
              , and do not include any of the default screen reader guidance
              that overlay flyouts contain out-of-the-box.
            </p>
            <p>
              Please be cautious when using push flyouts, and make sure you are
              managing your own focus and screen reader UX.
            </p>
          </EuiCallOut>
        </>
      ),
      snippet: flyoutPushedSnippet,
      demo: <FlyoutPush />,
      props: { EuiFlyout },
    },
    {
      title: 'Understanding max-width',
      source: [
        {
          type: GuideSectionTypes.TSX,
          code: flyoutMaxWidthSource,
        },
      ],
      text: (
        <>
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
        </>
      ),
      snippet: flyoutMaxWidthSnippet,
      demo: <FlyoutMaxWidth />,
      props: { EuiFlyout },
    },
    {
      title: 'Resizable flyouts',
      isBeta: true,
      source: [
        {
          type: GuideSectionTypes.JS,
          code: flyoutResizableSource,
        },
      ],
      text: (
        <>
          <p>
            You can use <strong>EuiFlyoutResizable</strong> to render a flyout
            that users can drag with their mouse or use arrow keys to resize.
            This may be useful for scenarios where the space the user needs can
            be unpredictable, if content is dynamic. Resizable flyouts allow
            users to adjust content to better fit their individual screens and
            workflows.
          </p>
          <p>
            We strongly recommend setting reasonable numerical{' '}
            <EuiCode>minWidth</EuiCode> and <EuiCode>maxWidth</EuiCode> props
            based on the flyout content and page content that you <em>can</em>{' '}
            predict.
          </p>
        </>
      ),
      snippet: flyoutResizableSnippet,
      demo: <FlyoutResizable />,
      props: { EuiFlyoutResizable },
    },
  ],
};
