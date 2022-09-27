import React from 'react';

import { EuiListGroup, EuiListGroupItem } from '../../../../src/components';

export default () => (
  <EuiListGroup showToolTips>
    <EuiListGroupItem
      onClick={() => {}}
      label="First item"
      toolTipText="This is tooltip text"
    />

    <EuiListGroupItem onClick={() => {}} label="Second item" />

    <EuiListGroupItem
      onClick={() => {}}
      label={
        <span>
          Third very, very long item that <strong>will surely</strong> force
          truncation
        </span>
      }
    />

    <EuiListGroupItem
      onClick={() => {}}
      wrapText
      label="Fourth very, very long item with wrapping enabled that will not force truncation"
    />
  </EuiListGroup>
);
