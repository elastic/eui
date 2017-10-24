import React from 'react';

import {
  EuiHorizontalRule,
} from '../../../../src/components';

export default () => (
  <div>
    <p>Small</p>
    <EuiHorizontalRule margin="small" />
    <p>Medium</p>
    <EuiHorizontalRule margin="medium" />
    <p>Large</p>
    <EuiHorizontalRule margin="large" />
    <p>XLarge</p>
    <EuiHorizontalRule margin="XLarge" />
    <p>XXLarge</p>
    <EuiHorizontalRule margin="XXLarge" />
  </div>
);

