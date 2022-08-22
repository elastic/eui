import React from 'react';

import {
  EuiCallOut,
  EuiCode,
  EuiLink,
  EuiText,
  EuiSpacer,
} from '../../../../src';

import ScrollBar from './scroll';
import ScrollX from './scroll_x';
import ScrollY from './scroll_y';
import FullHeight from './full_height';

export const ScrollExample = {
  title: 'Scroll',
  showThemeLanguageToggle: true,
  intro: (
    <>
      <EuiCallOut
        color="warning"
        iconType="accessibility"
        title="Scrollable regions must be focusable, promoted to region and with the right aria-label"
      >
        <p>
          To ensure keyboard-only users have access to the scrollable regions,
          the optimal solution is to apply <EuiCode>{'tabIndex="0"'}</EuiCode>{' '}
          to the region. Add{' '}
          <EuiCode language="html">{'role="region"'}</EuiCode> and supply an
          accessible name by using <EuiCode language="html">aria-label</EuiCode>{' '}
          or another method.{' '}
          <EuiLink href="https://dequeuniversity.com/rules/axe/4.1/scrollable-region-focusable">
            Learn more about the <EuiCode>scrollable-region-focusable</EuiCode>{' '}
            rule at Deque.
          </EuiLink>
        </p>
      </EuiCallOut>
    </>
  ),
  sections: [
    {
      title: 'Scroll bar style',
      wrapText: false,
      text: (
        <>
          <ScrollBar />
        </>
      ),
    },
    {
      title: 'Vertical (scroll-y)',
      color: 'subdued',
      wrapText: false,
      text: (
        <>
          <EuiText>
            <p>
              These utilities allow for quickly applying vertical scrolling to a
              container. They also automatically apply the minimal scroll bar
              styles as well. If you do not want your content to stretch to{' '}
              <EuiCode>100%</EuiCode> height, you will need to manually add a
              <EuiCode>height</EuiCode> (or <EuiCode>max-height</EuiCode>) to
              the container.
            </p>
            <p>
              The <EuiCode>WithShadows</EuiCode> variants are primarily used in
              modals and flyouts and masks the edges to indicate there is more
              content. When using these variants, you may want to add a small
              amount padding to the top and bottom of your content so the mask
              doesn&apos;t overlay it.
            </p>
          </EuiText>
          <EuiSpacer />
          <ScrollY />
        </>
      ),
    },
    {
      title: 'Horizontal (scroll-x)',
      wrapText: false,
      text: (
        <>
          <EuiText>
            <p>
              The horizontal equivalent should be used sparingly and usually
              only in full-height layouts or a grid of items.
            </p>
            <p>
              When using the <EuiCode>WithShadows</EuiCode> variant, you may
              want to add a small amount padding to the sides of your content so
              the mask doesn&apos;t overlay it.
            </p>
          </EuiText>
          <EuiSpacer />
          <ScrollX />
        </>
      ),
    },
    {
      title: 'Full height layout',
      color: 'subdued',
      wrapText: false,
      text: <FullHeight />,
    },
  ],
};
