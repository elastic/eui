import React from 'react';
import { Link } from 'react-router-dom';

import { EuiSpacer, EuiText, EuiTitle } from '../../../../src/components';
import { EuiHorizontalRule } from '../../../../src/components/horizontal_rule';
import UtilityClassesDisplay from './utility_classes';
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
    {
      // We avoid using the `title` key here to prevent these sections from showing up as sidebar links
      text: (
        <>
          <EuiHorizontalRule />
          <EuiTitle>
            <h2>Scroll</h2>
          </EuiTitle>
          <p>
            For overflow and scrolling specific utilities, go to the{' '}
            <Link to="/utilities/scroll">Scroll documentation page</Link>.
          </p>
          <EuiHorizontalRule />
          <EuiTitle>
            <h2>Text</h2>
          </EuiTitle>
          <p>
            For text and typography specific utilities, go to the{' '}
            <Link to="/utilities/text">Text documentation page</Link>.
          </p>
          <EuiSpacer size="xs" />
        </>
      ),
    },
  ],
};
