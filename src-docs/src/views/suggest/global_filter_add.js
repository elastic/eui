import React, { useState } from 'react';

import {
  EuiButtonEmpty,
  EuiPopover,
  EuiPopoverTitle,
  EuiFlexGroup,
  EuiFlexItem,
} from '../../../../src/components';

import GlobalFilterForm from './global_filter_form';

export default () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const togglePopover = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };

  const closePopover = () => {
    setIsPopoverOpen(false);
  };

  return (
    <EuiPopover
      isOpen={isPopoverOpen}
      closePopover={closePopover}
      button={
        <EuiButtonEmpty onClick={togglePopover} size="xs">
          + Add filter
        </EuiButtonEmpty>
      }
      anchorPosition="downCenter"
    >
      <EuiPopoverTitle>
        <EuiFlexGroup alignItems="baseline">
          <EuiFlexItem>Add a filter</EuiFlexItem>
          <EuiFlexItem grow={false}>
            {/* This button should open a modal */}
            <EuiButtonEmpty flush="right" size="xs">
              Edit as Query DSL
            </EuiButtonEmpty>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiPopoverTitle>

      <GlobalFilterForm
        style={{ width: 400 }}
        onAdd={togglePopover}
        onCancel={togglePopover}
      />
    </EuiPopover>
  );
};
