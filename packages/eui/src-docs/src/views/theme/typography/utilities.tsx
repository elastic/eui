import React from 'react';

import { EuiTitle } from '../../../../../src';

import { GuideSection } from '../../../components/guide_section/guide_section';

import TextAlignUtilities from './_text_align';
import TextWrappingUtilities from './_text_wrapping';
import TextNumberUtilities from './_text_numbers';
import TextColorUtilities from './_text_color';

// This array is used inside routes.js to create the sidenav sub-sections
export const textUtilitiesSections = [
  {
    title: 'Alignment',
    id: 'alignment',
  },
  {
    title: 'Wrapping',
    id: 'wrapping',
  },
  {
    title: 'Numbers',
    id: 'numbers',
  },
  {
    title: 'Color',
    id: 'color',
  },
];

export default () => {
  return (
    <>
      <GuideSection color="transparent">
        <EuiTitle>
          <h2
            id={`${textUtilitiesSections[0].id}`}
          >{`${textUtilitiesSections[0].title}`}</h2>
        </EuiTitle>

        <TextAlignUtilities />
      </GuideSection>

      <GuideSection color="subdued">
        <EuiTitle>
          <h2
            id={`${textUtilitiesSections[1].id}`}
          >{`${textUtilitiesSections[1].title}`}</h2>
        </EuiTitle>

        <TextWrappingUtilities />
      </GuideSection>

      <GuideSection color="transparent">
        <EuiTitle>
          <h2
            id={`${textUtilitiesSections[2].id}`}
          >{`${textUtilitiesSections[2].title}`}</h2>
        </EuiTitle>

        <TextNumberUtilities />
      </GuideSection>

      <GuideSection color="subdued">
        <EuiTitle>
          <h2
            id={`${textUtilitiesSections[3].id}`}
          >{`${textUtilitiesSections[3].title}`}</h2>
        </EuiTitle>

        <TextColorUtilities />
      </GuideSection>
    </>
  );
};
