import React from 'react';
import { Link } from 'react-router-dom';

import { ThemeNotice } from '../_components/_theme_notice';

import BreakpointValues, { breakpointSections } from './breakpoints';

import BreakpointUtilities, {
  breakpointUtilitySections,
} from './breakpoint_utilities';

export const BreakpointsExample = {
  title: 'Breakpoints',
  notice: <ThemeNotice />,
  showThemeLanguageToggle: true,
  description: (
    <>
      For most of your usages we recommend using the{' '}
      <Link to="/theming/breakpoints/utilities">responsive utilities</Link>{' '}
      <strong>instead</strong> of consuming the theme values directly.
    </>
  ),
  pages: [
    {
      title: 'Values',
      page: BreakpointValues,
      sections: breakpointSections,
    },
    {
      title: 'Utilities',
      page: BreakpointUtilities,
      sections: breakpointUtilitySections,
    },
  ],
};
