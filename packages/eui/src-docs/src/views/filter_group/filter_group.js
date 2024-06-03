import React, { useState } from 'react';

import {
  EuiFilterGroup,
  EuiFilterButton,
  EuiPopover,
  EuiSelectableMessage,
  EuiIcon,
  EuiSpacer,
} from '../../../../src/components';
import { useGeneratedHtmlId } from '../../../../src/services';

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

  const filterGroupPopoverId = useGeneratedHtmlId({
    prefix: 'filterGroupPopover',
  });

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
        id={filterGroupPopoverId}
        button={button}
        isOpen={isPopoverOpen}
        closePopover={closePopover}
        panelPaddingSize="none"
      >
        <EuiSelectableMessage>
          <EuiIcon type="minusInCircle" />
          <EuiSpacer size="xs" />
          <p>No filters found</p>
        </EuiSelectableMessage>
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
