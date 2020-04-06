import React, { useState, Fragment } from 'react';

import {
  EuiListGroup,
  EuiListGroupItem,
  EuiSpacer,
  EuiSwitch,
  EuiCode,
  EuiFlexGroup,
  EuiFlexItem,
} from '../../../../src/components';

export default () => {
  const [flushWidth, setFlushWidth] = useState(false);
  const [showBorder, setShowBorder] = useState(false);

  const handleOnClick = () => {
    alert('Item was clicked');
  };

  return (
    <Fragment>
      <EuiFlexGroup alignItems="center">
        <EuiFlexItem grow={false}>
          <EuiSwitch
            label={
              <span>
                Show as <EuiCode>flush</EuiCode>
              </span>
            }
            checked={flushWidth}
            onChange={() => setFlushWidth(!flushWidth)}
          />
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiSwitch
            label={
              <span>
                Show as <EuiCode>bordered</EuiCode>
              </span>
            }
            checked={showBorder}
            onChange={() => {
              setShowBorder(!showBorder);
            }}
          />
        </EuiFlexItem>
      </EuiFlexGroup>

      <EuiSpacer size="l" />

      <EuiListGroup flush={flushWidth} bordered={showBorder}>
        <EuiListGroupItem onClick={handleOnClick} label="First item" />

        <EuiListGroupItem onClick={handleOnClick} label="Second item" />

        <EuiListGroupItem onClick={handleOnClick} label="Third item" isActive />

        <EuiListGroupItem
          onClick={handleOnClick}
          label="Fourth item"
          isDisabled
        />
      </EuiListGroup>
    </Fragment>
  );
};
