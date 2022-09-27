import React from 'react';

import { GuideSection } from '../../components/guide_section/guide_section';
import { GuideSectionTypes } from '../../components/guide_section/guide_section_types';

import CustomFlyout from './complex/custom_flyout';
const customFlyoutSource = require('!!raw-loader!./complex/custom_flyout');

export default () => {
  return (
    <GuideSection
      demo={<CustomFlyout />}
      sectionProps={{
        paddingSize: 'none',
      }}
      source={[
        {
          type: GuideSectionTypes.JS,
          code: customFlyoutSource,
        },
      ]}
    />
  );
};
