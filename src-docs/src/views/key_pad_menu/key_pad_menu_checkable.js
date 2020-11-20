import React, { useState } from 'react';

import {
  EuiIcon,
  EuiKeyPadMenu,
  EuiKeyPadMenuItem,
} from '../../../../src/components';

export default () => {
  const [singleSelectedID, setSingleSelectedID] = useState(
    'singleKeypadSelect3'
  );
  const [multiSelect1isSelected, setmultiSelect1isSelected] = useState(false);
  const [multiSelect3isSelected, setmultiSelect3isSelected] = useState(false);

  return (
    <>
      <EuiKeyPadMenu checkable="single">
        <EuiKeyPadMenuItem
          id="singleKeypadSelect1"
          checkable="single"
          name="singleKeypadSelect"
          label="Button"
          onChange={(id) => {
            setSingleSelectedID(id);
          }}
          isSelected={singleSelectedID === 'singleKeypadSelect1'}>
          <EuiIcon type="dashboardApp" size="l" />
        </EuiKeyPadMenuItem>
        <EuiKeyPadMenuItem
          id="singleKeypadSelect2"
          checkable="single"
          name="singleKeypadSelect"
          label="Disabled"
          isDisabled
          isSelected={singleSelectedID === 'singleKeypadSelect2'}>
          <EuiIcon type="dashboardApp" size="l" />
        </EuiKeyPadMenuItem>
        <EuiKeyPadMenuItem
          id="singleKeypadSelect3"
          checkable="single"
          name="singleKeypadSelect"
          label="Selected"
          onChange={(id) => {
            setSingleSelectedID(id);
          }}
          isSelected={singleSelectedID === 'singleKeypadSelect3'}>
          <EuiIcon type="dashboardApp" size="l" />
        </EuiKeyPadMenuItem>
      </EuiKeyPadMenu>
      <EuiKeyPadMenu checkable="multi">
        <EuiKeyPadMenuItem
          isSelected={multiSelect1isSelected}
          checkable="multi"
          label="Link"
          onChange={() => {
            setmultiSelect1isSelected((selected) => !selected);
          }}>
          <EuiIcon type="dashboardApp" size="l" />
        </EuiKeyPadMenuItem>
        <EuiKeyPadMenuItem
          id="multiKeypadSelect2"
          checkable="multi"
          label="Link"
          isDisabled>
          <EuiIcon type="dashboardApp" size="l" />
        </EuiKeyPadMenuItem>
        <EuiKeyPadMenuItem
          isSelected={multiSelect3isSelected}
          id="multiKeypadSelect3"
          checkable="multi"
          label="Selected link"
          onChange={() => {
            setmultiSelect3isSelected((selected) => !selected);
          }}>
          <EuiIcon type="dashboardApp" size="l" />
        </EuiKeyPadMenuItem>
      </EuiKeyPadMenu>
    </>
  );
};
