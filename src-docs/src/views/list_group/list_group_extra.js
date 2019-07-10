import React from 'react';

import { EuiListGroup, EuiListGroupItem } from '../../../../src/components';

export default () => (
  <EuiListGroup showToolTips>
    <EuiListGroupItem label="First item" />

    <EuiListGroupItem label="Second item" />

    <EuiListGroupItem
      label={
        <span>
          Third very, very long item that <strong>will surely</strong> force
          truncation
        </span>
      }
    />

    <EuiListGroupItem
      wrapText
      label="Fourth very, very long item with wrapping enabled that will not force truncation"
    />
  </EuiListGroup>
);
