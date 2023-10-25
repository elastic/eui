import React, { useState } from 'react';

import {
  EuiBottomBar,
  EuiFlexGroup,
  EuiFlexItem,
  EuiButton,
  EuiButtonEmpty,
  EuiPopover,
  EuiContextMenuPanel,
  EuiContextMenuItem,
} from '../../../../src/components';

export default () => {
  const [showBar, setShowBar] = useState(false);
  const [showBarPopover, setShowBarPopover] = useState(false);
  const closePopover = () => setShowBarPopover(false);

  const button = (
    <EuiButton color="primary" onClick={() => setShowBar((show) => !show)}>
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
                <EuiPopover
                  isOpen={showBarPopover}
                  closePopover={closePopover}
                  button={
                    <EuiButton
                      color="text"
                      size="s"
                      iconType="help"
                      onClick={() => setShowBarPopover(!showBarPopover)}
                    >
                      Help
                    </EuiButton>
                  }
                  panelPaddingSize="none"
                  repositionOnScroll
                >
                  <EuiContextMenuPanel
                    items={[
                      <EuiContextMenuItem icon="link" onClick={closePopover}>
                        Link A
                      </EuiContextMenuItem>,
                      <EuiContextMenuItem icon="link" onClick={closePopover}>
                        Link B
                      </EuiContextMenuItem>,
                    ]}
                  />
                </EuiPopover>
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiButton color="text" size="s" iconType="user">
                  Add user
                </EuiButton>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiFlexGroup gutterSize="s">
              <EuiFlexItem grow={false}>
                <EuiButtonEmpty color="text" size="s" iconType="cross">
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
