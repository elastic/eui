import React from 'react';

import {
  EuiButtonToggle,
} from '../../../../src/components';

export default () => (
  <div>
    <EuiButtonToggle toggleLabel="Toggle Me">
      Toggle Me
    </EuiButtonToggle>

    <br />
    <br />

    <EuiButtonToggle color="primary" toggleLabel="I'm a primary toggle">
      I&apos;m a primary toggle
    </EuiButtonToggle>

    <br />
    <br />

    <EuiButtonToggle color="primary" isDisabled toggleLabel="Can't toggle this">
      Can&apos;t toggle this
    </EuiButtonToggle>

    <br />
    <br />

    <EuiButtonToggle color="primary" selected isDisabled toggleLabel="Can't toggle this">
      Can&apos;t toggle this either
    </EuiButtonToggle>
  </div>
);
