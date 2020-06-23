import React, { useState } from 'react';

import {
  EuiBottomBar,
  EuiButtonGroup,
  EuiButton,
  EuiButtonEmpty,
  EuiFlexGroup,
  EuiFlexItem,
} from '../../../../src/components';

export default () => {
  const [toggleIdSelected, setToggleIdSelected] = useState(null);

  const toggleButtons = [
    {
      id: 'bottomBarStandard',
      label: 'Show bottom bar',
    },
    {
      id: 'bottomBarWithoutAffordForDisplacement',
      label: 'Show bottom bar (without affordForDisplacement behavior)',
    },
  ];

  const onChange = optionId => {
    setToggleIdSelected(optionId);
  };

  return (
    <div>
      <EuiButtonGroup
        legend="Bottom Bar demo toggle buttons group"
        type="single"
        buttonSize="m"
        options={toggleButtons}
        idSelected={toggleIdSelected}
        onChange={id => onChange(id)}
      />

      {toggleIdSelected === 'bottomBarStandard' && (
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
                  <EuiButtonEmpty
                    onClick={() => setToggleIdSelected(null)}
                    color="ghost"
                    size="s"
                    iconType="cross">
                    Discard
                  </EuiButtonEmpty>
                </EuiFlexItem>
                <EuiFlexItem grow={false}>
                  <EuiButton color="primary" size="s" iconType="check" fill>
                    Save
                  </EuiButton>
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiBottomBar>
      )}

      {toggleIdSelected === 'bottomBarWithoutAffordForDisplacement' && (
        <EuiBottomBar affordForDisplacement={false}>
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
                  <EuiButtonEmpty
                    onClick={() => setToggleIdSelected(null)}
                    color="ghost"
                    size="s"
                    iconType="cross">
                    Discard
                  </EuiButtonEmpty>
                </EuiFlexItem>
                <EuiFlexItem grow={false}>
                  <EuiButton color="primary" size="s" iconType="check" fill>
                    Save
                  </EuiButton>
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiBottomBar>
      )}
    </div>
  );
};
