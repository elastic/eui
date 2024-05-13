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
        <EuiListGroupItem onClick={() => {}} label="First item" />

        <EuiListGroupItem onClick={() => {}} label="Second item" />

        <EuiListGroupItem onClick={() => {}} label="Third item" isActive />

        <EuiListGroupItem onClick={() => {}} label="Fourth item" isDisabled />
      </EuiListGroup>
    </Fragment>
  );
};
