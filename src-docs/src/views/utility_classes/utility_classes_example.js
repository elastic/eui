import React from 'react';
import { Link } from 'react-router-dom';

import { EuiSpacer, EuiText, EuiCallOut } from '../../../../src/components';
import UtilityClassesDisplay from './utility_classes';
import UtilityClassesVertAlign from './utility_classes_vert_align';

export const UtilityClassesExample = {
  title: 'CSS utility classes',
  intro: (
    <>
      <EuiText grow={false}>
        <p>
          The following CSS-only classes are provided as helper utilities. They
          are useful for making micro-adjustments to existing React components.
        </p>
      </EuiText>
      <EuiSpacer size="m" />
      <EuiCallOut title="Scroll utilities have moved" iconType="symlink">
        For overflow and scrolling specific utilities, go to the{' '}
        <Link to="/utilities/scroll">Scroll documentation page</Link>.
      </EuiCallOut>
      <EuiSpacer size="m" />
      <EuiCallOut title="Text utilities have moved" iconType="symlink">
        For text and typography specific utilities, go to the{' '}
        <Link to="/theming/typography/utilities">Text documentation page</Link>.
      </EuiCallOut>
      <EuiSpacer size="m" />
      <EuiCallOut title="Responsive utilities have moved" iconType="symlink">
        For responsive specific utilities, go to the{' '}
        <Link to="/theming/breakpoints/utilities">
          Breakpoint utilities page
        </Link>
        .
      </EuiCallOut>
    </>
  ),
  sections: [
    {
      title: 'Display',
      wrapText: false,
      text: <UtilityClassesDisplay />,
    },
    {
      title: 'Vertical alignment',
      color: 'subdued',
      wrapText: false,
      text: <UtilityClassesVertAlign />,
    },
  ],
};
