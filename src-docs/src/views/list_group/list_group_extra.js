import React from 'react';

import { EuiListGroup, EuiListGroupItem } from '../../../../src/components';

const handleOnClick = () => {
  alert('Item was clicked');
};

export default () => (
  <EuiListGroup showToolTips>
    <EuiListGroupItem onClick={handleOnClick} label="First item" />

    <EuiListGroupItem onClick={handleOnClick} label="Second item" />

    <EuiListGroupItem
      onClick={handleOnClick}
      label={
        <span>
          Third very, very long item that <strong>will surely</strong> force
          truncation
        </span>
      }
    />

    <EuiListGroupItem
      onClick={handleOnClick}
      wrapText
      label="Fourth very, very long item with wrapping enabled that will not force truncation"
    />
  </EuiListGroup>
);
