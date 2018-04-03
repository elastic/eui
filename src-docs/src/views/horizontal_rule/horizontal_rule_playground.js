import React from 'react';

import {
  EuiHorizontalRule,
} from '../../../../src/components';

import { GuideSectionPlayground } from '../../components/guide_section/guide_section_playground';

export default () => (
  <GuideSectionPlayground
    component={EuiHorizontalRule}
    demo={(
      <EuiHorizontalRule />
    )}
  />
);
