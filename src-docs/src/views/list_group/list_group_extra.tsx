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
      label="Fourth very long item with wrapping enabled, custom props, and will not force truncation."
      toolTipProps={{
        delay: 'regular',
        position: 'top',
        title: 'Title of record',
      }}
    />
  </EuiListGroup>
);
