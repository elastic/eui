import React from 'react';

import {
  EuiButtonToggle,
} from '../../../../src/components';

export default () => (
  <div>
    <EuiButtonToggle label="Toggle Me" />

    <br />
    <br />

    <EuiButtonToggle color="primary" label="I'm a primary toggle" />

    <br />
    <br />

    <EuiButtonToggle color="primary" isDisabled label="Can't toggle this" />

    <br />
    <br />

    <EuiButtonToggle color="primary" isSelected isDisabled label="Can't toggle this either" />
  </div>
);
