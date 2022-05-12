import React, { useState } from 'react';

import {
  EuiBottomBar,
  EuiButtonGroup,
  EuiButton,
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

  const onChange = (optionId) => {
    setToggleIdSelected(optionId);
  };

  return (
    <div>
      <EuiButtonGroup
        legend="Bottom Bar demo toggle buttons group"
        type="single"
        buttonSize="m"
        color="primary"
        options={toggleButtons}
        idSelected={toggleIdSelected}
        onChange={(id) => onChange(id)}
      />

      {toggleIdSelected && (
        <EuiBottomBar
          affordForDisplacement={toggleIdSelected === 'bottomBarStandard'}
        >
          <EuiFlexGroup justifyContent="flexEnd">
            <EuiFlexItem grow={false}>
              <EuiButton
                onClick={() => setToggleIdSelected(null)}
                color="ghost"
                size="s"
                iconType="cross"
              >
                close
              </EuiButton>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiBottomBar>
      )}
    </div>
  );
};
