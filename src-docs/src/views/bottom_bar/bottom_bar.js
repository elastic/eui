import React, { useState } from 'react';

import {
  EuiBottomBar,
  EuiFlexGroup,
  EuiFlexItem,
  EuiButton,
  EuiButtonEmpty,
} from '../../../../src/components';

export default () => {
  const [showBar, setShowBar] = useState(false);

  const button = (
    <EuiButton color="primary" onClick={() => setShowBar(!showBar)}>
      Toggle appearance of the bottom bar
    </EuiButton>
  );

  let bottomBar;
  if (showBar) {
    bottomBar = (
      <EuiBottomBar>
        <EuiFlexGroup justifyContent="spaceBetween">
          <EuiFlexItem grow={false}>
            <EuiFlexGroup gutterSize="s">
              <EuiFlexItem grow={false}>
                <EuiButton color="ghost" size="s" iconType="help">
                  Help
                </EuiButton>
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiButton color="ghost" size="s" iconType="user">
                  Add user
                </EuiButton>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiFlexGroup gutterSize="s">
              <EuiFlexItem grow={false}>
                <EuiButtonEmpty color="ghost" size="s" iconType="cross">
                  Discard
                </EuiButtonEmpty>
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiButton color="primary" fill size="s" iconType="check">
                  Save
                </EuiButton>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiBottomBar>
    );
  }

  return (
    <div>
      {button}
      {bottomBar}
    </div>
  );
};
