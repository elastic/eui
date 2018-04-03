import React from 'react';

import {
  EuiButton,
} from '../../../../src/components';

import { GuideSectionPlayground } from '../../components/guide_section/guide_section_playground';

export default () => (
  <GuideSectionPlayground
    component={EuiButton}
    demo={(
      <EuiButton>Click me, I&apos;m a button</EuiButton>
    )}
    props={['fill', 'color', 'size', 'isDisabled', 'type']}
  />
);
