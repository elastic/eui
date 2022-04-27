import React from 'react';
import { Link } from 'react-router-dom';

import { EuiSpacer, EuiText } from '../../../../src/components';
import { EuiHorizontalRule } from '../../../../src/components/horizontal_rule';
import UtilityClassesFunctions from './utility_functions';
import UtilityClassesMixins from './utility_mixins';
import UtilityClassesColor from './utility_color';
import UtilityClassesDisplay from './utility_classes';
import UtilityClassesText from './utility_classes_text';
import UtilityClassesVertAlign from './utility_classes_vert_align';
import UtilityClassesResponsive from './utility_classes_responsive';

export const UtilityClassesExample = {
  title: 'CSS utility classes',
  intro: (
    <EuiText grow={false}>
      <p>
        The following CSS-only classes are provided as helper utilities. They
        are useful for making micro-adjustments to existing React components.
        For overflow and scrolling specific utilities, go to the{' '}
        <Link to="/utilities/scroll">Scroll documentation page</Link>.
      </p>
    </EuiText>
  ),
  sections: [
    {
      title: 'Functions',
      wrapText: false,
      text: (
        <>
          <EuiSpacer />
          <UtilityClassesFunctions />
          <EuiSpacer />
          <EuiHorizontalRule />
        </>
      ),
    },
    {
      title: 'Mixins',
      wrapText: false,
      text: (
        <>
          <EuiSpacer />
          <UtilityClassesMixins />
          <EuiSpacer />
          <EuiHorizontalRule />
        </>
      ),
    },
    {
      title: 'Color',
      wrapText: false,
      text: (
        <>
          <EuiSpacer />
          <UtilityClassesColor />
          <EuiSpacer />
          <EuiHorizontalRule />
        </>
      ),
    },
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
