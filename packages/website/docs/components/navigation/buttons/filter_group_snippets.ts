/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

export const filterButtonSnippet = (): string => {
  return `<EuiFilterGroup>
  <EuiFilterButton
    hasActiveFilters={isFilterOn}
    isSelected={isFilterOn}
    onClick={toggleFilter}
    isToggle
  >
    Single filter
  </EuiFilterButton>
  <EuiFilterButton
    withNext
    hasActiveFilters={isOnFilterOn}
    isSelected={isOnFilterOn}
    onClick={toggleOnFilter}
    isToggle
  >
    On
  </EuiFilterButton>
  <EuiFilterButton
    hasActiveFilters={isOffFilterOn}
    isSelected={isOffFilterOn}
    onClick={toggleOffFilter}
    isToggle
  >
    Off
  </EuiFilterButton>
</EuiFilterGroup>`;
};

export const filterButtonPopoverSnippet = (): string => {
  return `<EuiFilterGroup>
  <EuiPopover
    button={
      <EuiFilterButton
        iconType="chevronSingleDown"
        onClick={onButtonClick}
        isSelected={isPopoverOpen}
        numFilters={items.length}
        hasActiveFilters={hasActiveFilters}
        numActiveFilters={numActiveFilters}
      >
        Composers
      </EuiFilterButton>
    }
    isOpen={isPopoverOpen}
    closePopover={closePopover}
  >
    <EuiSelectable
      options={items}
      onChange={setItems}
    >
      {(list, search) => (
        <>
          <EuiPopoverTitle>{search}</EuiPopoverTitle>
          {list}
        </>
      )}
    </EuiSelectable>
  </EuiPopover>
</EuiFilterGroup>`;
};

export const filterGroupFullWidthSnippet = (): string => {
  return `<EuiFilterGroup fullWidth>
  <EuiFilterButton grow={false} hasActiveFilters={isFilterOn} onClick={toggleFilter} isToggle>
    Filter
  </EuiFilterButton>
  <EuiFilterButton
    numFilters={12}
    hasActiveFilters={hasActiveFilters}
    numActiveFilters={2}
  >
    Filter with count
  </EuiFilterButton>
</EuiFilterGroup>`;
};
