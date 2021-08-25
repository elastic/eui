import React from 'react';

import { EuiSpacer, EuiText } from '../../../../src/components';
import { EuiHorizontalRule } from '../../../../src/components/horizontal_rule';
import { EuiCallOut } from '../../../../src/components/call_out';
import { EuiCode } from '../../../../src/components/code';
import { EuiLink } from '../../../../src/components/link';
import UtilityClassesDisplay from './utility_classes';
import UtilityClassesText from './utility_classes_text';
import UtilityClassesOverflows from './utility_classes_overflow';
import UtilityClassesVertAlign from './utility_classes_vert_align';
import UtilityClassesResponsive from './utility_classes_responsive';

export const UtilityClassesExample = {
  title: 'CSS utility classes',
  intro: (
    <EuiText grow={false}>
      <p>
        The following CSS-only classes are provided as helper utilities. They
        are useful for making micro-adjustments to existing React components.
      </p>
    </EuiText>
  ),
  sections: [
    {
      title: 'Display',
      wrapText: false,
      text: (
        <>
          <EuiSpacer />
          <UtilityClassesDisplay />
          <EuiSpacer />
          <EuiHorizontalRule />
        </>
      ),
    },
    {
      title: 'Text',
      wrapText: false,
      text: (
        <>
          <EuiSpacer />
          <UtilityClassesText />
          <EuiSpacer />
          <EuiHorizontalRule />
        </>
      ),
    },
    {
      title: 'Overflows',
      wrapText: false,
      text: (
        <>
          <EuiCallOut
            color="warning"
            iconType="accessibility"
            title="Scrollable regions must be focusable, promoted to region and with the right aria-label"
          >
            <p>
              To ensure keyboard-only users have access to the scrollable
              regions, the optimal solution is to apply{' '}
              <EuiCode>{'tabIndex="0"'}</EuiCode> to the region. Add{' '}
              <EuiCode language="html">{'role="region"'}</EuiCode> and supply an
              accessible name by using{' '}
              <EuiCode language="html">aria-label</EuiCode> or another method.
              <EuiLink href="https://dequeuniversity.com/rules/axe/4.1/scrollable-region-focusable">
                Learn more about the{' '}
                <EuiCode>scrollable-region-focusable</EuiCode> rule at Deque.
              </EuiLink>
            </p>
          </EuiCallOut>
          <EuiSpacer />
          <UtilityClassesOverflows />
          <EuiSpacer />
          <EuiHorizontalRule />
        </>
      ),
    },
    {
      title: 'Vertical alignment',
      wrapText: false,
      text: (
        <>
          <EuiSpacer />
          <UtilityClassesVertAlign />
          <EuiSpacer />
          <EuiHorizontalRule />
        </>
      ),
    },
    {
      title: 'Responsive',
      wrapText: false,
      text: (
        <>
          <EuiSpacer />
          <UtilityClassesResponsive />
        </>
      ),
    },
  ],
};
