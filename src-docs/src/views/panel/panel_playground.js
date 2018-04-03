import React from 'react';

import {
  EuiPanel,
} from '../../../../src/components';

import { GuideSectionPlayground } from '../../components/guide_section/guide_section_playground';

export default () => (
  <GuideSectionPlayground
    component={EuiPanel}
    demo={(
      <EuiPanel>This is a panel. Use wisely.</EuiPanel>
    )}
  />
);
