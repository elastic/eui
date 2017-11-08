import React from 'react';

import {
  EuiHorizontalRule,
} from '../../../../src/components';

export default () => (
  <div>
    <p>Small</p>
    <EuiHorizontalRule margin="s" />
    <p>Medium</p>
    <EuiHorizontalRule margin="m" />
    <p>Large</p>
    <EuiHorizontalRule margin="l" />
    <p>XLarge</p>
    <EuiHorizontalRule margin="xl" />
    <p>XXLarge</p>
    <EuiHorizontalRule margin="xxl" />
  </div>
);

