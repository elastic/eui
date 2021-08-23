import React, { useState } from 'react';

import {
  EuiPopover,
  EuiFilterGroup,
  EuiFilterButton,
  EuiIcon,
  EuiSpacer,
} from '../../../../src/components';

export default () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isFilterOn, setIsFilterOn] = useState(false);
  const [isOnFilterOn, setIsOnFilterOn] = useState(false);
  const [isOffFilterOn, setIsOffFilterOn] = useState(false);

  const toggleFilter = () => {
    setIsFilterOn(!isFilterOn);
  };

  const toggleOnFilter = () => {
    setIsOnFilterOn(!isOnFilterOn);
    setIsOffFilterOn(isOffFilterOn && !isOnFilterOn ? false : isOffFilterOn);
  };

  const toggleOffFilter = () => {
    setIsOffFilterOn(!isOffFilterOn);
    setIsOnFilterOn(isOnFilterOn && !isOffFilterOn ? false : isOnFilterOn);
  };

  const onButtonClick = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };

  const closePopover = () => {
    setIsPopoverOpen(false);
  };

  const button = (
    <EuiFilterButton
      iconType="arrowDown"
      onClick={onButtonClick}
      isSelected={isPopoverOpen}
      numFilters={12}
      hasActiveFilters={true}
      numActiveFilters={2}
    >
      Composers
    </EuiFilterButton>
  );

  return (
    <EuiFilterGroup fullWidth={true}>
      <EuiFilterButton
        grow={false}
        hasActiveFilters={isFilterOn}
        onClick={toggleFilter}
      >
        Filter
      </EuiFilterButton>
      <EuiFilterButton
        withNext
        grow={false}
        hasActiveFilters={isOnFilterOn}
        onClick={toggleOnFilter}
      >
        On
      </EuiFilterButton>
      <EuiFilterButton
        grow={false}
        hasActiveFilters={isOffFilterOn}
        onClick={toggleOffFilter}
      >
        Off
      </EuiFilterButton>
      <EuiPopover
        id="popover"
        button={button}
        isOpen={isPopoverOpen}
        closePopover={closePopover}
        panelPaddingSize="none"
      >
        <div className="euiFilterSelect__note">
          <div className="euiFilterSelect__noteContent">
            <EuiIcon type="minusInCircle" />
            <EuiSpacer size="xs" />
            <p>No filters found</p>
          </div>
        </div>
      </EuiPopover>
      <EuiFilterButton
        numFilters={12}
        hasActiveFilters={isFilterOn}
        onClick={toggleFilter}
      >
        Filter with a very long name
      </EuiFilterButton>
    </EuiFilterGroup>
  );
};
